import mongoose, { Schema } from "mongoose"

const SubCollectionSchema = new mongoose.Schema({
    label: String,
    slug: String
})

export const CollectionSchema = new mongoose.Schema({
    label: String,
    slug: String,
    subcollections: [{ type: Schema.Types.ObjectId, ref: 'SubCollection' }]
})

CollectionSchema.pre('save', function (next, options) {
    this.slug = this.label!.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    next()
})

SubCollectionSchema.pre('save', function (next, options) {
    this.slug = this.label!.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    next()
})

export const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema)

export const SubCollection = mongoose.models.SubCollection || mongoose.model("SubCollection", SubCollectionSchema)