'use client'

import CartProduct from "@/components/cart/CartProduct";
import { useShoppingCart } from "@/components/context/ShoppingCartContext"
import Link from "next/link";

export default function CartPage() {
    const { items, loaded } = useShoppingCart();

    return <div className="m-auto min-h-screen container">
        <h2 className="text-2xl w-fit m-auto">Shopping Cart</h2>
        {loaded ?
            <div>
                <table className="w-full [&_td]:border-y-1 [&_th]:py-2 [&_td]:py-4 [&_th]:border-zinc-400 [&_td]:border-zinc-400 table-fixed">
                    <thead className="text-[12px]">
                        <tr>
                            <th className="text-left">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((cartItem, idx) => <CartProduct key={idx} item={cartItem} />)}
                    </tbody>
                </table>
                <div className="ml-auto mt-4 w-fit">
                    <Link href="/checkout/info">
                        <button className="button w-md rounded-md h-12 ml-auto">Check Out</button>
                    </Link>
                </div>
            </div> :
            <div className="space-y-4">
                <p>Your shopping cart is currently empty</p>
                <Link href="/" className="underline">Continue Shopping</Link>
            </div>
        }
    </div>
}