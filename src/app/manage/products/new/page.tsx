'use client'

import ImageUploadPanel from "@/components/ImageUploadPanel"
import Modal from "@/components/Modal"
import { createOrUpdateProduct } from "@/lib/actions"
import { ProductData } from "@/lib/types"

export const ProductFormElements = (props: { product?: ProductData }) =>
    <>
        <div className="flex gap-4">
            <div className="panel flex flex-col gap-4 w-fit">
                <label>Title
                    <input name="name" type="text" className="input-field" defaultValue={props.product?.name} />
                </label>
                <label>Description
                    <textarea name="description" className="input-field block" defaultValue={props.product?.description} />
                </label>
                <div>
                    <label>Price
                        <input name="price" type="number" step="0.01" min="0.00" placeholder="0.00" defaultValue={props.product?.price} className="input-field pl-6" />
                    </label>
                    <span className="absolute -translate-y-7 translate-x-2">$</span>
                </div>
                <label>Category
                    <input name="category" required={false} type="text" className="input-field" defaultValue={props.product?.category} />
                </label>
            </div>
            <ImageUploadPanel/>
        </div>
        <input type="submit" className="button self-end" />
    </>

export default function NewProductPage() {
    return <form className="flex flex-col gap-2" action={createOrUpdateProduct}>
        <ProductFormElements />
    </form>
}