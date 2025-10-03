'use client'

import ProductDisplay from "@/components/page/ProductDisplay"
import PageSelector from "@/components/PageSelector"
import { ProductData } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaginatedProducts(props: { perPage: number, productCount: number, fetchEndpoint: string }) {
    const [products, setProducts] = useState<ProductData[]>([])
    const [sortType, setSortType] = useState<string>('price')

    const searchParams = useSearchParams();
    let pageIndex = !!searchParams.get('page') ? Number(searchParams.get('page')) : 1

    const endpointUrl = new URL(props.fetchEndpoint)

    async function fetchData() {
        endpointUrl.searchParams.set('page', String(pageIndex))
        endpointUrl.searchParams.set('perPage', String(props.perPage))
        endpointUrl.searchParams.set('sort', sortType)
        const data = await fetch(endpointUrl)
        const products = await data.json()

        setProducts(products)
    }

    useEffect(() => {
        if (pageIndex == 0) {
            pageIndex = 1
        }
        fetchData()
    }, [pageIndex, sortType])

    return <div>
        <div className="w-full flex justify-end">
            <div>
                <h2 className="w-fit m-auto">Sort By</h2>
                <select className="input-field" onChange={e => {setSortType(e.target.value)}}>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="name">Name, A-Z</option>
                    <option value="-name">Name, Z-A</option>
                    <option value="createdAt">Date, New to Old</option>
                    <option value="-createdAt">Date, Old to New</option>
                </select>
            </div>
        </div>
        <ProductDisplay products={products} />
        <PageSelector pageCount={Math.ceil(props.productCount / props.perPage)} index={pageIndex} />
    </div>
}