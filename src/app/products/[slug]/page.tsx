import AddToCart from "@/components/AddToCart";
import ImageGallery from "@/components/ImageGallery";
import { getBaseUrl } from "@/lib/util";

export default async function ProductPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    const data = await fetch(`${getBaseUrl()}/api/product/slug/${slug}`)
    const product = await data.json()

    return <div className="m-auto container min-h-screen flex flex-col items-center">
        <div className="flex flex-row">
            <ImageGallery imageUrls={product.images!} />
            <div className="w-sm bg-zinc-200">
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                </div>
                <AddToCart/>
            </div>
        </div>
        <div className="w-md">
            <p className="w-md">{product.description}</p>
        </div>
    </div>
}