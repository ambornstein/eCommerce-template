import Image from "next/image"
import ShoppingCartIcon from "../cart/ShoppingCartIcon"
import Link from "next/link"
import { getBaseUrl } from "@/lib/util"
import { CollectionData } from "@/lib/types"

export default async function Header() {
    const data = await fetch(`${getBaseUrl()}/api/collection`)
    const collections = await data.json();

    return <div>
        <div className="w-[90%] m-auto h-fit py-4 flex flex-row items-center">
            <Image width={50} height={50} src={'/favicon.ico'} alt='Home' className="size-24 lg:size-32" />
            <div className="ml-auto flex gap-4">
                <Link href="/manage"><Image width={40} height={40} src='/user.png' alt='Home' className="h-fit" /></Link>
                <ShoppingCartIcon />
            </div>
        </div>
        <nav className="h-12 px-[5%] w-full bg-zinc-100 flex gap-6 uppercase">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/" className="nav-link">All Products</Link>
            {collections.map((collection: CollectionData) =>
                <div className="group">
                    <Link href={`/collection/${collection.slug}`} className="nav-link">{collection.label}</Link>
                    {collection.subcollections.length > 0 && <div className="absolute group-hover:flex flex-col hidden p-2 bg-white border-b-2 border-zinc-700">
                        {collection.subcollections.map(sub =>
                            <Link href={`/collection/${collection.slug}/${sub.slug}`} className="nav-link border-none text-zinc-500 hover:text-zinc-800">{sub.label}</Link>
                        )}
                    </div>}
                </div>
            )}
        </nav>
    </div>
}