import { ProductData } from "@/lib/types";
import Link from "next/link";

export default async function ProductDashboard() {
    const data = await fetch(`http://localhost:3000/api/product`)
    const products = await data.json()

    return <div className="panel flex flex-col gap-2 p-2">
        <div>
            <Link href="/manage/products/new" className="float-end button">New Product</Link>
        </div>
        <table className="w-full">
            <thead className="data-header">
                <tr>
                    <th>Product Name</th>
                    <th>Inventory</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product: ProductData) =>
                    <tr className="data-row" key={product._id}>
                        <td className="cursor-pointer"><Link href={`http://localhost:3000/manage/products/${product._id}`}>{product.name} </Link></td>
                        <td className="text-center">0</td>
                        <td className="text-center">{product.price}</td>
                        <td>{product.category}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div >
}