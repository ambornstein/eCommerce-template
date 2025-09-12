'use client'

import { createOrUpdateProduct } from "@/lib/actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductData } from "@/lib/types";
import ProductFormElements from "@/components/ProductFormElements";

export default function EditProductPage() {
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductData>()
    useEffect(() => {
        if (!params.id) return
        fetch('/api/product/' + params.id).then(res => res.json()).then(data => setProduct(data))
    }, [params.id])

    return <form className="flex flex-col gap-2" action={createOrUpdateProduct}>
        <input type="hidden" name="id" value={params.id} />
        <ProductFormElements product={product} />
        <button className="button w-fit float-start">Delete</button>
    </form>
}