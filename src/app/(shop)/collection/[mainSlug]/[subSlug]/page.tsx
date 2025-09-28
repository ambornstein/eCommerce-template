import ProductDisplay from "@/components/page/ProductDisplay"
import { getBaseUrl } from "@/lib/util"

export default async function SubcollectionPage({ params }: {
    params: Promise<{ mainSlug: string, subSlug: string }>
}) {

    const { mainSlug, subSlug } = await params
    const targetUrl = new URL(`${getBaseUrl()}/api/product`)
    targetUrl.searchParams.append("collection", mainSlug)
    targetUrl.searchParams.append("subcollection", subSlug)

    const data = await fetch(targetUrl.href)
    const products = await data.json()

    return <ProductDisplay products={products} />
}