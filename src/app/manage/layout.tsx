import Link from "next/link";

export default function ManagementLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className={`m-auto py-4 max-w-3xl grid grid-cols-[max-content_1fr] gap-4`}>
        <div className="flex flex-col gap-4 panel sticky p-2 h-fit">
            <Link href="/manage">Dashboard</Link>
            <Link href="/manage/products">Products</Link>
            <Link href="/manage/collections">Collections</Link>
            <Link href="/manage/inventory">Inventory</Link>
            <Link href="/manage/orders">Orders</Link>
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
}