'use client'

import Image from "next/image"
import { InventoryRecord, ProductData } from "@/lib/types"
import { useEffect, useState } from "react"
import Modal from "../Modal"
import Link from "next/link"
import ImageCarousel from "../image/ImageCarousel"
import { formatPrice, getBaseUrl, imageUrlOrFallback } from "@/lib/util"
import AddToCart from "../input/AddToCart"

export default function ProductView(props: { product: ProductData }) {
    const [quickBuyOpen, setQuickBuyOpen] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [inventory, setInventory] = useState<InventoryRecord | undefined>(undefined)

    function updateInventory() {
        fetch(`${getBaseUrl()}/api/product/${props.product._id}/inventory`).then(res => res.json()).then(data => setInventory(data))
    }

    useEffect(() => {
        updateInventory()
    }, [])

    const productLink = `/products/${props.product.slugName}`

    return <div className="flex flex-col gap-8 p-2 overflow-hidden" onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
        <Link href={productLink} className="h-full">
            <Image width={300} height={300} src={imageUrlOrFallback(props.product.images[0])} alt='Home' className="m-auto hover:scale-110 transition-all" />
        </Link>
        {inventory && inventory.availableCount <= 0 && <div className="absolute dark-contrast m-2 p-2 rounded-md text-xl">Sold Out</div>}
        <button className={`w-48 outline-1 text-center p-2 self-center cursor-pointer ${mouseOver ? 'visible' : 'invisible'}`}
            onClick={() => setQuickBuyOpen(true)}>Quick Buy</button>
        <Link href={productLink}>
            <dl className="*:block text-lg">
                <dd>{props.product.name}</dd>
                <dd>{formatPrice(props.product.price)}</dd>
            </dl>
        </Link>
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
                <div className="p-8 bg-zinc-200 w-full h-fit grid grid-cols-[1fr_1fr] gap-4 items-center rounded-b-lg">
                    <AddToCart product={props.product} invRecord={inventory} />
                </div>
            </div>
        </Modal>
    </div>
}