import { InventoryRecord, ProductData } from "@/lib/types";
import { formatPrice } from "@/lib/util";
import Link from "next/link";

export default async function ProductDashboard() {
    const data = await fetch(`http://localhost:3000/api/product/inventory`)
    const products = await data.json()

    return <div className="panel flex flex-col gap-2 p-2">
        <div>
            <Link href="/manage/products/new" className="float-end button">New Product</Link>
        </div>
        <table className="w-full">
            <thead className="data-header">
                <tr>
                    <th>Product Name</th>
                    <th>Available Stock</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((record: InventoryRecord) =>
                    <tr className="data-row" key={record.product._id}>
                        <td className="cursor-pointer">{record.product.name}</td>
                        <td className="text-center">{record.availableCount}</td>
                        <td className="text-center">{formatPrice(record.product.price)}</td>
                        <td>{record.product.collection}</td>
                        <Link className="absolute left-0 w-full h-full cursor-pointer" href={`http://localhost:3000/manage/products/${record.product._id}`}></Link>
                    </tr>
                )}
            </tbody>
        </table>
    </div >
}