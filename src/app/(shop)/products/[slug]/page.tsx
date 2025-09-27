import AddToCart from "@/components/input/AddToCart";
import ImageGallery from "@/components/product/ImageGallery";
import { getBaseUrl } from "@/lib/util";

export default async function ProductPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    const data = await fetch(`${getBaseUrl()}/api/product/slug/${slug}`)
    const product = await data.json()

    return <div className="m-auto container min-h-screen flex flex-col items-center gap-8 mt-4">
        <div className="flex flex-row min-h-[600px]">
            <ImageGallery imageUrls={product.images!} />
            <div className="w-sm h-fit sticky top-12 mt-4">
                <div className="mb-12">
                    <h2 className="text-2xl">{product.name}</h2>
                    <h2 className="text-2xl">${product.price}</h2>
                </div>
                <AddToCart product={product}/>
            </div>
        </div>
        <div className="w-lg">
            <p className="w-full">{product.description} fr fr fr fr fr fr fr </p>
        </div>
    </div>
}