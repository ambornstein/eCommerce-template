'use client'

import { useShoppingCart } from "./context/ShoppingCartContext"
import ItemOrder from "./ItemOrder";

export default function CheckoutTotal() {
    const { items, getTotal } = useShoppingCart();

    const total = getTotal()
    return <div className="lg:fixed relative w-auto lg:w-[45%] h-screen right-0 bg-zinc-100 border-l-1 border-zinc-200 p-12">
        <div className="w-sm flex flex-col gap-4">
            {items.map((item) => <ItemOrder item={item} />)}
            <div className="flex justify-between">
                <h3>Subtotal</h3>
                <p className="inline">${total}</p>
            </div>
            <div className="flex justify-between text-xl">
                <h3>Total</h3>
                <p className="inline">${total}</p>
            </div>
        </div>
    </div>
}