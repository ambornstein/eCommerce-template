'use client'

import { useEffect, useState } from "react"
import QuantityCounter from "./QuantityCounter"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { InventoryRecord, ProductData } from "@/lib/types"
import { clamp } from "@/lib/util"

export default function AddToCart(props: { product: ProductData, invRecord?: InventoryRecord }) {
    const [quantity, setQuantity] = useState(1)
    const { addItem, findItemQuantity, justAdded } = useShoppingCart();
    const [validQuantity, setValidQuantity] = useState(0);

    useEffect(() => {
        setValidQuantity((props.invRecord?.availableCount ?? 0) - findItemQuantity(props.product._id))

    }, [props.invRecord, justAdded])

    useEffect(() => {
        setQuantity(clamp(1, validQuantity, quantity))
    }, [validQuantity])

    return <div className="flex flex-col gap-2">
        <p>Quantity</p>
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} maximum={validQuantity} />
        <button className={`cart-button w-full h-12 ${validQuantity <= 0 && 'bg-red-400'}`} onClick={() => addItem(props.product, quantity)} disabled={validQuantity <= 0}>
            {validQuantity > 0 ? 'Add To Cart' : 'Sold Out'}
        </button>
    </div>
}