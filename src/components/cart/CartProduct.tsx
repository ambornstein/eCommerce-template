'use client'
import { formatPrice, formatTotal, getBaseUrl, imageUrlOrFallback } from "@/lib/util"
import Image from "next/image"
import { useShoppingCart } from "../context/ShoppingCartContext";
import { InventoryRecord, ItemOrderData } from "@/lib/types";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import QuantityCounter from "../input/QuantityCounter";

export default function CartProduct(props: { item: ItemOrderData }) {
    const { setItemQuantity, removeItem, items } = useShoppingCart();

    const [inventory, setInventory] = useState<InventoryRecord | undefined>(undefined)

    function updateInventory() {
        fetch(`${getBaseUrl()}/api/product/${props.item.product._id}/inventory`).then(res => res.json()).then(data => setInventory(data))
    }

    useEffect(() => {
        updateInventory()
    }, [items.length])

    return <tr>
        <td className="space-x-4">
            <Image width={100} height={100} src={imageUrlOrFallback(props.item.product.images[0])} alt='image' className="inline size-32" />
            <p className="inline">{props.item.product.name}</p>
        </td>
        <td className="text-center">{formatPrice(props.item.product.price)}</td>
        <td>
            <div className="w-fit m-auto">
                <QuantityCounter quantity={props.item.quantity} setQuantity={(q) => setItemQuantity(props.item.product, q)} maximum={inventory?.availableCount} />
                <div className="w-fit m-auto mt-4">
                    <span className="flex items-center justify-center cursor-pointer select-none" onClick={() => removeItem(props.item.product)}>
                        <CgClose className="inline size-6" />Remove
                    </span>
                </div>
            </div>
        </td>
        <td className="text-right">{formatTotal(props.item)}</td>
    </tr>
}