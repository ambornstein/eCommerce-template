'use client'
import { imageBaseUrl } from "@/lib/config"
import { ProductData } from "@/lib/types"
import { useState } from "react"
import ProductQuickBuy from "../product/ProductQuickBuy"
import Modal from "../Modal"
import Link from "next/link"

export default function ProductPanel(props: { product: ProductData }) {
    const [quickBuyOpen, setQuickBuyOpen] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)

    const imageURL = props.product.images![0] ? imageBaseUrl + props.product.images![0] : '/file.svg'

    const productLink = `/products/${props.product.slugName}`

    return <div className="flex flex-col gap-8 p-2 overflow-hidden" onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
        <Link href={productLink} className="h-full">
            <img src={imageURL} alt='Home' className="object-contain hover:scale-110 transition-all" />
        </Link>
        <button className={`w-48 outline-1 text-center p-2 self-center cursor-pointer ${mouseOver ? 'visible' : 'invisible'}`} onClick={() => setQuickBuyOpen(true)}>Quick Buy</button>
        <dl className="*:block text-lg">
            <Link href={productLink}><dd>{props.product.name}</dd></Link>
            <dd>${props.product.price}</dd>
        </dl>
        <Modal isOpen={quickBuyOpen} setIsOpen={(value) => setQuickBuyOpen(value)}>
            <ProductQuickBuy product={props.product} />
        </Modal>
    </div>
}