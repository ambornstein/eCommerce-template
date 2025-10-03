import mongoose, { Schema } from "mongoose";

export const InventoryRecordSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    stockCount: { type: Number, default: 0 },
    orderedCount: { type: Number, default: 11 }
}, {
    virtuals: {
        availableCount: {
            get() { return this.stockCount - this.orderedCount }
        }
    },
    toJSON: { virtuals: true }
})

export const InventoryRecord = mongoose.models.InventoryRecord || mongoose.model('InventoryRecord', InventoryRecordSchema)