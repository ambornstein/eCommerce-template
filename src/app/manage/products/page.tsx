'use client'

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDashboard() {
    const [products, setProducts] = useState<any[]>()
    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const pro = await fetch('/api/product');
        const res = await pro.json()

        setProducts(res)
    }

    return <div className="panel flex flex-col gap-2">
        <div>
            <Link href="/manage/products/new" className="float-end button">New Product</Link>
        </div>
        <table className="w-full">
            <thead className="bg-zinc-400">
                <tr>
                    <th>Product Name</th>
                    <th>Inventory</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) =>
                    <tr key={product._id} onClick={() => redirect(`/manage/products/${product._id}`)}>
                        <td>{product.name}</td>
                        <td>0</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div >
}