'use client'

import Image from "next/image"
import {  useState } from "react"

export default function ShoppingCart() {
    const [opened, setOpened] = useState(false)

    return <div className="relative">
        <Image width={40} height={40} src='/shopping-bag.png' alt='Home' className="h-fit cursor-pointer" onMouseEnter={() => setOpened(true)} />
        {opened && <div className="absolute outline-round bg-background h-48 w-64 top-full right-0 translate-y-4 px-4 py-6" onMouseLeave={() => setOpened(false)}>
            <p>Cart:</p>
        </div>}
    </div>
}


