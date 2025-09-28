
//Product record from database

export type ProductData = {
    _id: string
    name: string
    description: string
    price: number
    category?: number
    images?: string[]
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