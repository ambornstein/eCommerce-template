'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductData } from "@/lib/types";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductData>()

    const fetchProduct = () => fetch('/api/product/' + params.id).then(res => res.json()).then(data => setProduct(data))

    useEffect(() => {
        fetchProduct()
    }, [])

    return <ProductForm fetchProduct={fetchProduct} product={product}/>
}