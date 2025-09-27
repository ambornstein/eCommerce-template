'use client'

import { createContext, useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import ProductQuickBuy from "../product/ProductQuickBuy";
import { ProductData } from "@/lib/types";

const ShoppingCartContext = createContext({
    items: [] as CartItem[],
    addItem: (product: ProductData, quantity: number) => { },
    removeItem: (product: ProductData) => { },
    setItemQuantity: (product: ProductData, quantity: number) => { },
    getItemCount: (): number => 0,
    getTotal: (): number => 0,
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

    function getTotal() {
        return cartItems.reduce((sum, current) => sum + (current.product.price * current.quantity), 0)
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
        if (confirm(`Really delete ${product.name} from your cart?`)) {
            setCartItems(cartItems.filter((val) => val.product._id != product._id))
            updateCart()
        }
    }

    function setItemQuantity(product: ProductData, quantity: number) {
        const items = [...cartItems]
        const itemIndex = items.findIndex((val) => val.product._id == product._id)
        console.log(itemIndex)
        if (itemIndex >= 0) {
            items[itemIndex].quantity = quantity
            setCartItems(items)
        }
        else {
            addItem(product, quantity)
        }
        updateCart()
    }

    return <ShoppingCartContext.Provider value={{ items: cartItems, removeItem, addItem, setItemQuantity, loaded, getItemCount, getTotal }}>
        {children}
    </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);