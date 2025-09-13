
//Product record from database

export interface ProductData {
    _id: string
    name: string,
    description: string,
    price: number,
    category?: number
    images?: string[]
}