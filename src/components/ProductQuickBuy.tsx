import { ProductData } from "@/lib/types";
import ImageCarousel from "./ImageCarousel";

export default function ProductQuickBuy(props: { product: ProductData }) {
    return (<div className="flex flex-col">
        <div className="mt-2 mx-4">
            <a href={"/products/" + props.product._id}>More Details</a>
            <ImageCarousel imageUrls={props.product.images!} />
        </div>
        <div className="mx-4">
            <div>
                <dl>
                    <dd>{props.product.name}</dd>
                    <dd>${props.product.price}</dd>
                </dl>
            </div>
        </div>
        <div className="p-4 bg-neutral-400 w-full h-fit grid grid-cols-[auto_1fr_1fr] gap-4 items-center">
            <label className="flex flex-col">
                Quantity
                <input type="number" min={1} max={10} className="w-24"/>
            </label>
            <button className="button h-full">Add To Cart</button>
        </div>
    </div>)
}