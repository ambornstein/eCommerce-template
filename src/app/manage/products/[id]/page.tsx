import ProductForm from "@/components/admin/ProductForm";
import { getBaseUrl } from "@/lib/util";

export default async function EditProductPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const data = await fetch(`${getBaseUrl()}/api/product/${id}`)
    const product = await data.json()

    return <ProductForm product={product}/>
}