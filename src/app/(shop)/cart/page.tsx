'use client'

import { useShoppingCart } from "@/components/context/ShoppingCartContext"
import QuantityCounter from "@/components/input/QuantityCounter";
import { imageBaseUrl } from "@/lib/config";
import { formatTotal, formatPrice } from "@/lib/util";
import Image from "next/image";
import Link from "next/link";
import { CgClose } from "react-icons/cg";

export default function CartPage() {
    const { items, loaded, setItemQuantity, removeItem } = useShoppingCart();

    return <div className="m-auto min-h-screen container">
        <h2 className="text-2xl w-fit m-auto">Shopping Cart</h2>
        {loaded ?
            <div>
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
                        {items.map((cartItem) =>
                            <tr>
                                <td className="space-x-4">
                                    <Image width={100} height={100} src={imageBaseUrl + cartItem.product.images![0]} alt='image' className="inline size-32" />
                                    <p className="inline">{cartItem.product.name}</p>
                                </td>
                                <td className="text-center">{formatPrice(cartItem.product.price)}</td>
                                <td>
                                    <div className="w-fit m-auto">
                                        <QuantityCounter quantity={cartItem.quantity} setQuantity={(q) => setItemQuantity(cartItem.product, q)} />
                                        <div className="w-fit m-auto mt-4">
                                            <span className="flex items-center justify-center cursor-pointer select-none" onClick={() => removeItem(cartItem.product)}>
                                                <CgClose className="inline size-6" />Remove
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-right">{formatTotal(cartItem)}</td>
                            </tr>
                        )}
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