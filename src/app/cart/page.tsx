'use client'

import { useShoppingCart } from "@/components/context/ShoppingCartContext"
import { imageBaseUrl } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { items, loaded } = useShoppingCart();

    return <div className="m-auto min-h-screen container">
        <h2 className="text-2xl w-fit m-auto">Shopping Cart</h2>
        {items.length ?
            <table className="w-full [&_td]:border-y-1 [&_th]:py-2 [&_td]:py-4 [&_th]:border-zinc-400 [&_td]:border-zinc-400 ">
                <thead className="text-[12px]">
                    <tr>
                        <th className="text-left">Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {loaded && items.map((cartItem) =>
                        <tr>
                            <td className="space-x-4">
                                <Image width={100} height={100} src={imageBaseUrl + cartItem.product.images![0]} alt='image' className="inline size-48" />
                                <p className="inline">{cartItem.product.name}</p>
                            </td>
                            <td className="text-center">${cartItem.product.price}</td>
                            <td className="text-center">{cartItem.quantity}</td>
                            <td className="text-right">${cartItem.product.price * cartItem.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table> :
            <div className="space-y-4">
                <p>Your shopping cart is currently empty</p>
                <Link href="/" className="underline">Continue Shopping</Link>
            </div>
        }
    </div>
}