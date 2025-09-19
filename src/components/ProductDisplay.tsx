import { Suspense} from "react"
import ProductPanel from "./ProductPanel"
import { ProductData } from "@/lib/types"
import { getBaseUrl } from "@/lib/util"

export default async function ProductDisplay() {
    const data = await fetch(`${getBaseUrl()}/api/product`)
    const products = await data.json()

    return <div className="m-auto max-w-[90%] grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        <Suspense fallback={<p>Hello</p>}>
            {products?.map((pr: ProductData) => <ProductPanel product={pr} />)}
        </Suspense>
    </div>
}