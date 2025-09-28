import { imageBaseUrl } from "@/lib/config";
import { ItemOrderData } from "@/lib/types";
import { formatTotal } from "@/lib/util";

export default function ItemCart(props: { item: ItemOrderData }) {
    return <div className="grid grid-cols-[64px_1fr] gap-4">
        <img src={`${imageBaseUrl}${props.item.product.images![0]}`} alt="Product Image" className="size-[64px] rounded-md outline-2 outline-white shadow-sm" />

        <div>
            <span>{props.item.product.name}</span>
            {props.item.quantity > 1 && <span className="inline ml-2 text-[12px]">x{props.item.quantity}</span>}
            <span className="block">{formatTotal(props.item)}</span>
        </div>
    </div>
}