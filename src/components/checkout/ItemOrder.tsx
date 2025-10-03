import { imageBaseUrl } from "@/lib/config";
import { ItemOrderData } from "@/lib/types";
import { imageUrlOrFallback } from "@/lib/util";

export default function ItemOrder(props: { item: ItemOrderData }) {
    return <div className="grid grid-cols-[64px_1fr_auto] gap-4">
        <div className="relative size-[64px]">
            <img src={imageUrlOrFallback(props.item.product.images[0])} alt="Product Image" className="size-[64px] rounded-md outline-2 outline-white shadow-sm" />
            <span className="absolute -right-2 -top-2 bg-black rounded-md px-2 py-0.5 outline-2 outline-white text-zinc-200">{props.item.quantity}</span>
        </div>
        <span>{props.item.product.name}</span>
        <span>${(props.item.product.price * props.item.quantity).toFixed(2)}</span>
    </div>
}