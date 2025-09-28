'use client'

import { imageBaseUrl } from "@/lib/config"
import { ProductData } from "@/lib/types"
import { useState } from "react"
import Modal from "../Modal"
import Link from "next/link"
import { useShoppingCart } from "../context/ShoppingCartContext"
import ImageCarousel from "../product/ImageCarousel"
import { formatPrice } from "@/lib/util"

export default function ProductView(props: { product: ProductData }) {
    const [quickBuyOpen, setQuickBuyOpen] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const { addItem } = useShoppingCart();
    const [amount, setAmount] = useState(1)

    const imageURL = props.product.images![0] ? imageBaseUrl + props.product.images![0] : '/file.svg'

    const productLink = `/products/${props.product.slugName}`

    return <div className="flex flex-col gap-8 p-2 overflow-hidden" onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
        <Link href={productLink} className="h-full">
            <img src={imageURL} alt='Home' className="object-contain hover:scale-110 transition-all" />
        </Link>
        <button className={`w-48 outline-1 text-center p-2 self-center cursor-pointer ${mouseOver ? 'visible' : 'invisible'}`} onClick={() => setQuickBuyOpen(true)}>Quick Buy</button>
        <dl className="*:block text-lg">
            <Link href={productLink}><dd>{props.product.name}</dd></Link>
            <dd>{formatPrice(props.product.price)}</dd>
        </dl>
        <Modal isOpen={quickBuyOpen} setIsOpen={(value) => setQuickBuyOpen(value)}>
            <div className="flex flex-col w-xl">
                <div className="mt-2 mx-8 space-y-8">
                    <a href={"/products/" + props.product.slugName}><p>More Details</p></a>
                    <ImageCarousel imageUrls={props.product.images!} />
                    <div>
                        <dl>
                            <dd>{props.product.name}</dd>
                            <dd>{formatPrice(props.product.price)}</dd>
                        </dl>
                    </div>
                </div>
                <div className="p-8 bg-zinc-200 w-full h-fit grid grid-cols-[auto_1fr_1fr] gap-4 items-center rounded-b-lg">
                    <label className="flex flex-col h-fit">
                        <p className="text-[12px]">Quantity</p>
                        <input type="number" min={1} max={10} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-24 input-field" />
                    </label>
                    <button className="bg-red-600 text-zinc-200 rounded-lg h-full max-w-72" onClick={() => {
                        addItem(props.product, amount)
                        setQuickBuyOpen(false)
                    }}>Add To Cart</button>
                </div>
            </div>
        </Modal>
    </div>
}