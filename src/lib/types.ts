
//Product record from database

export type ProductData = {
    _id: string
    name: string
    description: string
    price: number
    collection: string
    subcollection: string
    images: string[]
    slugName: string
}

export type ItemOrderData = {
    product: ProductData,
    quantity: number
}

export type SubCollectionData = {
    label: string
    slug: string
}

export type CollectionData = {
    label: string,
    slug: string,
    subcollections: SubCollectionData[]
}

export type InventoryRecord = {
    _id: string,
    product: ProductData
    stockCount: number
    orderedCount: number
    availableCount: number
}