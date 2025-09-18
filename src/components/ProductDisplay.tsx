'use client'

import { ProductData } from "@/lib/types"
import { useEffect, useState } from "react"
import ProductPanel from "./ProductPanel"

export default function ProductDisplay() {
    const [products, setProducts] = useState<ProductData[]>()
    const fetchProducts = () => fetch('/api/product').then(res => res.json()).then(data => setProducts(data))

    useEffect(() => {
        fetchProducts()
    }, [])

    return <div className="grid grid-cols-4 gap-8">
        {products?.map(pr => <ProductPanel product={pr} />)}
    </div>
}