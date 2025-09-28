'use server'

import { Product } from "./models/product";

export async function updateProductImages(id: string, imageNames: string[]) {
    await Product.findByIdAndUpdate(id, { $set: { images: imageNames, } }, { upsert: true }).exec()
}
