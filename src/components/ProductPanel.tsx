import { imageBaseUrl } from "@/lib/config"
import { ProductData } from "@/lib/types"
import { useShoppingCart } from "./context/ShoppingCartContext"
import { useState } from "react"
import ProductQuickBuy from "./ProductQuickBuy"
import Modal from "./Modal"

export default function ProductPanel(props: { product: ProductData }) {
    const [quickBuyOpen, setQuickBuyOpen] = useState(false)

    const imageURL = props.product.images![0] ? imageBaseUrl + props.product.images![0] : '/file.svg'

    return <div className="flex flex-col gap-8 bg-zinc-300 p-2 overflow-hidden border-c">
        <img src={imageURL} alt='Home' className="object-contain h-full hover:scale-110 transition-all" />
        <button className="w-48 outline-1 text-center p-2 self-center" onClick={() => setQuickBuyOpen(true)}>Quick Buy</button>
        <dl className="*:block text-lg">
            <dd>{props.product.name}</dd>
            <dd>${props.product.price}</dd>
        </dl>
        <Modal isOpen={quickBuyOpen} setIsOpen={(value) => setQuickBuyOpen(value)}>
            <ProductQuickBuy product={props.product} />
        </Modal>
    </div>
}