import ProductDisplay from "@/components/page/ProductDisplay"
import { getBaseUrl } from "@/lib/util"

export default async function CollectionPage({ params }: {
    params: Promise<{ mainSlug: string }>
}) {
    const { mainSlug } = await params
    const targetUrl = new URL(`${getBaseUrl()}/api/product`)
    targetUrl.searchParams.append("collection", mainSlug)

    const data = await fetch(targetUrl.href)
    const products = await data.json()

    return <ProductDisplay products={products} />
}