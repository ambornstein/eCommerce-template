import { client, ordersController } from "@/lib/paypal";
import { ItemOrderData } from "@/lib/types";
import { calculateTotal } from "@/lib/util";
import { ApiError, CheckoutPaymentIntent, Item, OrderRequest } from "@paypal/paypal-server-sdk";

export async function POST(request: Request) {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const cart = await request.json()
        const result = await createOrder(cart);
        return new Response(JSON.stringify(result!.jsonResponse), { status: result!.httpStatusCode })
    } catch (error) {
        console.error("Failed to create order:", error);
        return new Response("Failed to create order", { status: 500 })
    }

}
const createOrder = async (cart: ItemOrderData[]) => {
    const collect: {body: OrderRequest, prefer: string} = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: calculateTotal(cart).toFixed(2),
                        breakdown: {
                            itemTotal: {
                                currencyCode: "USD",
                                value: calculateTotal(cart).toFixed(2),
                            },
                        },
                    },
                    // lookup item details in `cart` from database
                    items: cart.map((item) => {
                        return {
                            name: item.product.name,
                            unitAmount: {
                                currencyCode: "USD",
                                value: (item.product.price * item.quantity).toFixed(2),
                            },
                            quantity: item.quantity.toFixed(0),
                        }
                    }),
                },
            ],
        },
        prefer: "return=minimal",
    };


    try {
        const { body, ...httpResponse } = await ordersController.createOrder(
            collect
        );

        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return {
            jsonResponse: body,
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message);
        }
    }
}