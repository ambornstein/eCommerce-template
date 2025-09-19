'use client'

import { useState } from "react"
import QuantityCounter from "./QuantityCounter"

export default function AddToCart() {
    const [quantity, setQuantity] = useState(1)

    return <div>
        <p>Quantity</p>
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
        <button className="cart-button">Add To Cart</button>
    </div>
}