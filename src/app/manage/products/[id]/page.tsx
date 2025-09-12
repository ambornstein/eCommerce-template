'use client'

import { createOrUpdateProduct } from "@/lib/actions";
import { ProductFormElements } from "../new/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState<ProductData>()
    useEffect(() => {
        fetch('/api/product/' + params.id).then(res => res.json()).then(data => setProduct(data))
    }, [])

    return <form className="flex flex-col gap-2" action={createOrUpdateProduct}>
        <input type="hidden" name="id" value={params.id} />
        <ProductFormElements product={product} />
    </form>
}