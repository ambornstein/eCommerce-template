'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useShoppingCart } from "../context/ShoppingCartContext"
import ItemCart from "./ItemCart"
import { CgClose } from "react-icons/cg"
import { formatTotal, formatPrice } from "@/lib/util"

export default function ShoppingCartIcon() {
    const { loaded, items, justAdded, dismissAdded, getItemCount, getTotal } = useShoppingCart()
    const [opened, setOpened] = useState(false)

    const itemCount = getItemCount()
    const total = getTotal()
    return <div className="relative">
        <Link href="/cart">
            <Image width={40} height={40} src='/shopping-bag.png' alt='Home' className="h-fit cursor-pointer" onMouseEnter={() => setOpened(true)} />
        </Link>
        {loaded && <span className="absolute top-3.5 text-center w-[40px] pointer-events-none">{itemCount}</span>}
        {opened && <div className="absolute z-10 popup-detail panel-outline right-0 translate-y-4" onMouseLeave={() => setOpened(false)}>
            <p>Cart:</p>
            {items.map((item, idx) => <ItemCart item={item} key={idx}/>)}
            <div className="occupy-space">
                <p>Items:</p>
                <span>{itemCount}</span>
            </div>
            <div className="occupy-space text-lg">
                <p>Subtotal:</p>
                <span>{formatPrice(total)}</span>
            </div>
            <Link href="/cart"><button className="button w-full rounded-md h-10">Checkout</button></Link>
        </div>}
        {justAdded && <div className="fixed z-10 popup-detail right-8 top-8 panel-outline ">
            <div className="occupy-space">
                <p>Added:</p>
                <CgClose className="standard-icon" onClick={dismissAdded} />
            </div>
            <ItemCart item={justAdded} />
            <div className="occupy-space">
                <p>Items:</p>
                <span>{justAdded.quantity}</span>
            </div>
            <div className="occupy-space text-lg">
                <p>Subtotal:</p>
                <span>{formatTotal(justAdded)}</span>
            </div>
            <Link href="/cart"><button className="button w-full rounded-md h-10">Checkout</button></Link>
        </div>}
    </div>
}


