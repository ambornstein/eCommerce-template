import mongoose, { Schema } from "mongoose"
import { ContactSchema, ShippingAddressSchema } from "./customer"

const ProductBatchSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
})

const OrderSchema = new mongoose.Schema({
    contact: ContactSchema,
    address: ShippingAddressSchema,
    items: [{ type: ProductBatchSchema }],
    timestamp: {type: Date, default: Date.now}
})

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)