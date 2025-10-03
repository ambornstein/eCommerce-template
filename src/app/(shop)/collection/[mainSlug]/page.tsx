import { getBaseUrl } from "@/lib/util"
import PaginatedProducts from "./_components/PaginatedProducts"

export default async function CollectionPage({ params }: {
    params: Promise<{ mainSlug: string }>
}) {
    const { mainSlug } = await params
    const targetUrl = new URL(`${getBaseUrl()}/api/product`)
    const countUrl = new URL(`${getBaseUrl()}/api/product/count`)
    targetUrl.searchParams.append("collection", mainSlug)
    countUrl.searchParams.append("collection", mainSlug)

    const countData = await fetch (countUrl.href)
    const count = await countData.json()

    return <PaginatedProducts productCount={count} perPage={4} fetchEndpoint={targetUrl.href}/>
}