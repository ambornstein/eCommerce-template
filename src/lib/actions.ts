'use server'

import dbConnect from "./db";
import { Product } from "./models/product";

export async function createOrUpdateProduct(formData: FormData) {
    await dbConnect();
    
    const id = formData.get('id')

    if (id) {
        const product = Product.findById(id)

        formData.delete("id")
        await product.updateOne(Object.fromEntries(formData))
    }
    else {
        await Product.insertOne(Object.fromEntries(formData))
    }
}