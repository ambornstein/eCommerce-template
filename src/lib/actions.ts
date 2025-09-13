'use server'

import { revalidatePath } from "next/cache";
import dbConnect from "./db";
import { Product } from "./models/product";

export async function createOrUpdateProduct(formData: FormData) {
    await dbConnect();

    let id = formData.get('id')?.toString()
    const images = formData.getAll('image').map(i => i.toString())

    if (id) {
        formData.delete("id")
        const product = await Product.findByIdAndUpdate(id, Object.fromEntries(formData))
    }
    else {
        const product = await Product.insertOne(Object.fromEntries(formData))
        id = product._id
    }

    updateProductImages(id!, images)

    revalidatePath("/manage/products/" + id)
}

export async function updateProductImages(id: string, imageNames: string[]) {
    console.log(imageNames)
    await Product.findByIdAndUpdate(id, { $set: { images: imageNames, } }, { upsert: true }).exec()
}