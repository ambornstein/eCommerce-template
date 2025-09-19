import { ProductData } from "@/lib/types";
import ImageCarousel from "./ImageCarousel";

export default function ProductQuickBuy(props: { product: ProductData }) {
    return (<div className="flex flex-col w-xl">
        <div className="mt-2 mx-8 space-y-8">
            <a href={"/products/" + props.product.slugName}><p>More Details</p></a>
            <ImageCarousel imageUrls={props.product.images!} />
            <div>
                <dl>
                    <dd>{props.product.name}</dd>
                    <dd>${props.product.price}</dd>
                </dl>
            </div>
        </div>
        <div className="p-8 bg-stone-200 w-full h-fit grid grid-cols-[auto_1fr_1fr] gap-4 items-center rounded-b-lg">
            <label className="flex flex-col h-fit">
                <p className="text-[12px]">Quantity</p>
                <input type="number" min={1} max={10} defaultValue={1} className="w-24 input-field" />
            </label>
            <button className="bg-red-600 text-zinc-200 rounded-lg h-full max-w-72">Add To Cart</button>
        </div>
    </div>)
}