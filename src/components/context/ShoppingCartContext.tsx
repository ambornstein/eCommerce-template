'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { ItemOrderData, ProductData } from "@/lib/types";
import { calculateTotal } from "@/lib/util";

const ShoppingCartContext = createContext({
    items: [] as ItemOrderData[],
    justAdded: undefined as ItemOrderData | undefined,
    addItem: (product: ProductData, quantity: number) => { },
    findItemQuantity: (id: string): number => 0,
    removeItem: (product: ProductData) => { },
    setItemQuantity: (product: ProductData, quantity: number) => { },
    getItemCount: (): number => 0,
    getTotal: (): number => 0,
    dismissAdded: () => {},
    loaded: false
})

export function ShoppingCartProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [cartItems, setCartItems] = useState<ItemOrderData[]>([])
    const [justAdded, setJustAdded] = useState<ItemOrderData | undefined>(undefined)
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
        return calculateTotal(cartItems)
    }

    function findItem(id: string) {
        return cartItems.find((val) => val.product._id == id)
    }

    function findItemQuantity(id: string) {
        return findItem(id)?.quantity ?? 0;
    }

    function addItem(product: ProductData, quantity: number) {
        const item = findItem(product._id);
        if (item) {
            item.quantity += quantity
        }
        else {
            setCartItems([...cartItems, { product: product, quantity }])
        }
        setJustAdded({ product, quantity })
        setTimeout(dismissAdded, 5000)
        updateCart()
    }

    function dismissAdded() {
        setJustAdded(undefined)
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
      
        if (itemIndex >= 0) {
            items[itemIndex].quantity = quantity
            setCartItems(items)
        }
        else {
            addItem(product, quantity)
        }
        updateCart()
    }

    return <ShoppingCartContext.Provider value={{ items: cartItems, justAdded, dismissAdded, removeItem, addItem, setItemQuantity, findItemQuantity, loaded, getItemCount, getTotal }}>
        {children}
    </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider;

export const useShoppingCart = () => useContext(ShoppingCartContext);