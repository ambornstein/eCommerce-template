import Link from "next/link";

export default function ProductDashboard() {
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
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
}