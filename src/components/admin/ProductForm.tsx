'use client'

import { CollectionData, ProductData } from "@/lib/types";
import ImageUploadPanel from "./ImageUploadPanel";
import { FormEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ProductForm(props: { product?: ProductData, }) {
    const [collections, setCollections] = useState<CollectionData[]>([])
    const [selectedCollection, setSelectedCollection] = useState<string | undefined>(undefined)
    const [images, setImages] = useState<string[]>([])

    function addImages(imageNames: string[]) {
        setImages(i => [...i, ...imageNames])
    }

    function removeImage(index: number) {
        setImages(i => [...i.slice(0, index), ...i.slice(index + 1)])
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        if (props.product) {
            await fetch("/api/product/" + props.product._id, {
                method: "PATCH",
                body: formData
            })
        }
        else {
            await fetch("/api/product", {
                method: "POST",
                body: formData
            })
        }

        redirect('/manage/products')
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (confirm("Really delete product " + props.product?.name + "?")) {
            fetch("/api/product/" + props.product?._id, { method: "DELETE" }).then((_i) => redirect('/manage/products'))
        }
    }

    useEffect(() => {
        fetch("/api/collection").then(res => res.json()).then(data => setCollections(data))
    }, [])

    useEffect(() => {
        if (props.product) {
            setImages(props.product.images!)
            if (props.product.collection) {
                setSelectedCollection(props.product.collection)
            }
        }
    }, [props.product])

    return <div className="relative grid grid-cols-[auto_300px] gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={props.product?._id} />
            {images?.map((i, j) => <input type="hidden" name="image" value={i} key={j} />)}
            <div className="panel flex flex-col gap-4 p-4">
                <label>Product Name
                    <input name="name" type="text" className="input-field block w-full" defaultValue={props.product?.name} />
                </label>
                <label>Description
                    <textarea name="description" className="input-field block resize-none h-48 w-full" defaultValue={props.product?.description} />
                </label>
                <div>
                    <label>Price
                        <input name="price" type="number" step="0.01" min="0.00" placeholder="0.00" defaultValue={props.product?.price} className="input-field block pl-6 w-full" />
                    </label>
                    <span className="absolute -translate-y-7 translate-x-2">$</span>
                </div>

                <div>
                    <label className="occupy-space">
                        Collection
                        <span className="text-zinc-400">Optional</span>
                    </label>
                    <select name="collection" required={false} className="block w-full input-field" onChange={e => setSelectedCollection(e.target.value)}>
                        <option value="">- - -</option>
                        {collections.map((c, index) =>
                            <option key={index} selected={c.slug == props.product?.collection} value={c.slug}>{c.label}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="occupy-space">
                        <span>Sub-Collection</span>
                        <span className="text-zinc-400">Optional</span>
                    </label>
                    <select name="subcollection" required={false} className="block w-full input-field"
                        defaultValue={props.product?.subcollection ?? ""}>
                        <option value="">- - -</option>
                        {collections.find(val => val.slug == selectedCollection)?.subcollections.map((c, index) =>
                            <option key={index} selected={c.slug == props.product?.subcollection} value={c.slug}>{c.label}</option>
                        )}
                    </select>
                </div>
                <div className="self-end space-x-2">
                    <input type="submit" className="button" />
                    {props.product && <button className="button w-fit" onClick={handleDelete}>Delete</button>}
                </div>
            </div>
        </form >
        <ImageUploadPanel images={images} addImages={addImages} removeImage={removeImage} />
    </div >
}