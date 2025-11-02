import { ordersController } from "@/lib/paypal";
import { ApiError } from "@paypal/paypal-server-sdk";

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        const { orderId } = await params
        const result = await captureOrder(orderId);
        return new Response(JSON.stringify(result!.jsonResponse), { status: result!.httpStatusCode })
    } catch (error) {
        console.error("Failed to create order:", error);
        return new Response("Failed to create order", { status: 500 })
    }
}

const captureOrder = async (orderID: any) => {
    const collect = {
        id: orderID,
        prefer: "return=minimal",
    };

    try {
        const { body, ...httpResponse } = await ordersController.captureOrder(
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
};