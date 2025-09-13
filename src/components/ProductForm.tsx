'use client'

import { ProductData } from "@/lib/types";
import ImageUploadPanel from "./ImageUploadPanel";
import { createOrUpdateProduct } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";


export default function ProductForm(props: { product?: ProductData }) {
    const [images, setImages] = useState<string[]>([])

    function addImages(imageNames: string[]) {
        setImages(i => [...i, ...imageNames])
    }

    function removeImage(index: number) {
        setImages(i => [...i.slice(0, index), ...i.slice(index + 1)])
    }

    useEffect(() => {
        if (props.product) setImages(props.product.images!)
    }, [props.product])

    return <div className="flex gap-4">
        <form className="flex flex-col gap-2" action={async (e) => {
            createOrUpdateProduct(e)
            redirect('/manage/products')
        }}>
            <input type="hidden" name="id" defaultValue={props.product?._id} />
            {images?.map((i, j) => <input type="hidden" name="image" value={i} key={j} />)}
            <div className="panel flex flex-col gap-4 w-fit">
                <label>Title
                    <input name="name" type="text" className="input-field" defaultValue={props.product?.name} />
                </label>
                <label>Description
                    <textarea name="description" className="input-field block resize-none h-48" defaultValue={props.product?.description} />
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
            <div className="self-end space-x-2">
                {props.product && <button className="button w-fit">Delete</button>}
                <input type="submit" className="button " />
            </div>
        </form>
        <div className="h-full w-full">
            <ImageUploadPanel images={images} addImages={addImages} removeImage={removeImage} />
        </div>
    </div>
}