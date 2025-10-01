'use client'

import ProductDisplay from "@/components/page/ProductDisplay"
import PageSelector from "@/components/PageSelector"
import { ProductData } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaginatedProducts(props: {perPage: number, productCount: number, fetchEndpoint: string}) {
    const searchParams = useSearchParams();
    let pageIndex = Number(searchParams.get('page'))
    
    const [products, setProducts] = useState<ProductData[]>([])

    const endpointUrl = new URL(props.fetchEndpoint)

    async function fetchData() { 
        endpointUrl.searchParams.set('page', String(pageIndex))
        const data = await fetch(endpointUrl)
        const products = await data.json()

        setProducts(products)
    }

    useEffect(() => {
        if (pageIndex == 0) {
            pageIndex = 1
        }
        fetchData()
    }, [pageIndex])

    return <div>
        <ProductDisplay products={products} />
        <PageSelector pageCount={Math.ceil(props.productCount / props.perPage)} index={pageIndex} />
    </div>
}