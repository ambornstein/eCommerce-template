'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ShoppingCart() {
    const [opened, setOpened] = useState(false)

    return <div className="relative">
        <Link href="/cart">
            <Image width={40} height={40} src='/shopping-bag.png' alt='Home' className="h-fit cursor-pointer" onMouseEnter={() => setOpened(true)} />
        </Link>
        {opened && <div className="absolute w-64 h-48 px-4 py-6 right-0 translate-y-4 panel-outline panel" onMouseLeave={() => setOpened(false)}>
            <p>Cart:</p>
        </div>}
    </div>
}


