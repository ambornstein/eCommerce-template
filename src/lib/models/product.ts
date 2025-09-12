import mongoose from "mongoose"

export const ProductSchema = new mongoose.Schema({ 
    name: String,
    price: { type: Number, min: 0},
    description: String,
    category: { type: String, required: false}
})

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)