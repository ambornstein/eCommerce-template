import mongoose from "mongoose"
import { InventoryRecord } from "./inventoryRecord";

export const ProductSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, min: 0 },
    description: String,
    category: { type: String, required: false },
    images: { type: [String], requred: false },
    slugName: { type: String, required: false }
})

ProductSchema.pre('save', function (next, options) {
    this.slugName = this.name!.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    InventoryRecord.updateOne({ product: this._id }, {}, { upsert: true }).then(() => next())
})

ProductSchema.post(/[Uu]pdate/, function (doc) {
    doc.save()
})

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)