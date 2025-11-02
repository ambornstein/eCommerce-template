import mongoose from "mongoose"
import { InventoryRecord } from "./inventoryRecord";

export const ProductSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, min: 0 },
    description: String,
    collection: { type: String, required: false },
    subcollection: { type: String, required: false },
    images: [String],
    slugName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
}, {
    suppressReservedKeysWarning: true
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