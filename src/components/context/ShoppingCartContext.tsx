'use client'

import { createContext, useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import ProductQuickBuy from "../ProductQuickBuy";
import { ProductData } from "@/lib/types";

const ShoppingCartContext = createContext({
    items: [] as CartItem[],
    addItem: (product: ProductData, quantity: number) => { },
    removeItem: (product: ProductData) => { },
    reduceItem: (product: ProductData, quantity: number) => { },
    loaded: false
})

interface CartItem {
    product: ProductData,
    quantity: number,
}

export function ShoppingCartProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const storage = localStorage.getItem('cartItems')!
        const storedData = JSON.parse(storage);

        retrieveItems(storedData)
    }, [])

    useEffect(() => {
        if (loaded) {
            updateCart()
        }
    }, [cartItems])

    function updateCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems.map((item) => {
            return { product: item.product._id, quantity: item.quantity }
        })))
    }

    async function retrieveItems(data: Array<any>) {
        const products = await Promise.all(data.map(async (item: any) => {
            const product = await fetch(`/api/product/${item.product}`).then(res => res.json())
            return {
                product: product,
                quantity: item.quantity
            }
        }))

        setCartItems(products)
        setLoaded(true)
    }

    function getItemCount() {
        return cartItems.reduce((sum, current) => sum + current.quantity, 0)
    }

    function findItem(id: string) {
        return cartItems.find((val) => val.product._id == id)
    }

    function addItem(product: ProductData, quantity: number) {
        const item = findItem(product._id);
        if (item) {
            item.quantity += quantity
        }
        else {
            setCartItems([...cartItems, { product: product, quantity }])
        }
        updateCart()
    }

    function removeItem(product: ProductData) {
        setCartItems(cartItems.filter((val) => val.product._id != product._id))
        updateCart()
    }

    function reduceItem(product: ProductData, quantity: number) {
        const item = findItem(product._id);
        if (item) {
            item.quantity -= quantity
        }
        updateCart()
    }

    return <ShoppingCartContext.Provider value={{ items: cartItems, removeItem, addItem, reduceItem, loaded }}>
        {children}
    </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);