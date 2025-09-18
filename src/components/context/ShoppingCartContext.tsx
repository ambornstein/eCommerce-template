'use client'

import { createContext, useContext, useState } from "react";
import Modal from "../Modal";
import ProductQuickBuy from "../ProductQuickBuy";
import { ProductData } from "@/lib/types";

const ShoppingCartContext = createContext({
    items: [] as CartItem[],
    addItem: (id: string, quantity: number) => { },
    removeItem: (id: string) => { },
    reduceItem: (id: string, quantity: number) => { },
})

interface CartItem {
    productId: string,
    quantity: number,
}

export function ShoppingCartProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemCount() {
        return cartItems.reduce((sum, current) => sum + current.quantity, 0)
    }

    function findItem(id: string) {
        return cartItems.find((val) => val.productId == id)
    }

    function addItem(id: string, quantity: number) {
        const item = findItem(id);
        if (item) {
            item.quantity += quantity
        }
        else {
            setCartItems([...cartItems, { productId: id, quantity }])
        }
    }

    function removeItem(id: string) {
        setCartItems(cartItems.filter((val) => val.productId != id))
    }

    function reduceItem(id: string, quantity: number) {
        const item = findItem(id);
        if (item) {
            item.quantity -= quantity
        }
    }

    return <ShoppingCartContext.Provider value={{ items: cartItems, removeItem, addItem, reduceItem }}>
        {children}
    </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);