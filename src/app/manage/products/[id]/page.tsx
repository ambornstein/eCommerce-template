'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductData } from "@/lib/types";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductData>()

    useEffect(() => {
        if (!params.id) return
        fetch('/api/product/' + params.id).then(res => res.json()).then(data => setProduct(data))
    }, [params.id])

    return <ProductForm product={product}/>
}