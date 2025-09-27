'use client'

import { useState } from "react"
import QuantityCounter from "./QuantityCounter"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { ProductData } from "@/lib/types"

export default function AddToCart(props: { product: ProductData }) {
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useShoppingCart();

    return <div className="flex flex-col gap-4 px-2 justify-center">
        <p>Quantity</p>
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
        <button className="cart-button w-full h-12" onClick={() => addItem(props.product, quantity) }>Add To Cart</button>
    </div>
}