import { getBaseUrl } from "@/lib/util"
import ProductView from "./ProductView"
import { ProductData } from "@/lib/types"

export default function ProductDisplay(props: { products: any }) {
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {props.products?.map((pr: ProductData) => <ProductView product={pr} />)}
    </div>
}