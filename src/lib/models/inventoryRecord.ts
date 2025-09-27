import mongoose, { Schema } from "mongoose";

export const InventoryRecordSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    stockCount: { type: Number, default: 0 },
    unavailableCount: { type: Number, default: 0 }
})

export const InventoryRecord = mongoose.models.InventoryRecord || mongoose.model('InventoryRecord', InventoryRecordSchema)