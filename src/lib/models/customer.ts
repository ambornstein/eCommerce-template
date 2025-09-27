import mongoose, { Schema } from "mongoose"

export const ShippingAddressSchema = new mongoose.Schema({
    address: String,
    subAddress: { type: String, required: false },
    city: String,
    state: String,
    zipcode: Number
})

export const ContactSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phone: String
})


