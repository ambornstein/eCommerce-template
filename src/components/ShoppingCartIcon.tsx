'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useShoppingCart } from "./context/ShoppingCartContext"
import ItemCart from "./ItemCart"

export default function ShoppingCartIcon() {
    const { loaded, items, getItemCount, getTotal } = useShoppingCart()
    const [opened, setOpened] = useState(false)

    const itemCount = getItemCount()
    const total = getTotal()
    return <div className="relative">
        <Link href="/cart">
            <Image width={40} height={40} src='/shopping-bag.png' alt='Home' className="h-fit cursor-pointer" onMouseEnter={() => setOpened(true)} />
        </Link>
        {loaded && <span className="absolute top-3.5 text-center w-[40px] pointer-events-none">{itemCount}</span>}
        {opened && <div className="absolute min-w-sm min-h-48 flex flex-col gap-4 px-8 py-10 right-0 translate-y-4 panel-outline bg-white rounded-sm" onMouseLeave={() => setOpened(false)}>
            <p>Cart:</p>
            {items.map((item) => <ItemCart item={item} />)}
            <div className="flex justify-between">
                <p>Items:</p>
                <span>{itemCount}</span>
            </div>
            <div className="flex justify-between text-lg">
                <p>Subtotal:</p>
                <span>${total}</span>
            </div>
            <Link href="cart"><button className="button w-full rounded-md">Checkout</button></Link>
        </div>}
    </div>
}


