'use client'

import ProductFormElements from "@/components/ProductFormElements"
import { createOrUpdateProduct } from "@/lib/actions"

export default function NewProductPage() {
    return <form className="flex flex-col gap-2" action={createOrUpdateProduct}>
        <ProductFormElements />
    </form>
}