import Image from "next/image"
import ShoppingCart from "./ShoppingCart"
import Link from "next/link"

export default function Header() {
    return <div>
        <div className="w-[90%] m-auto h-fit py-4 flex flex-row items-center">
            <Image width={50} height={50} src={'/favicon.ico'} alt='Home' className="size-24 lg:size-32" />
            <div className="ml-auto flex gap-4">
                <Image width={40} height={40} src='/user.png' alt='Home' className="h-fit" />
                <ShoppingCart />
            </div>
        </div>
        <nav className="h-12 px-[5%] w-full bg-zinc-300 flex gap-6 items-center uppercase">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/" className="nav-link">All Products</Link>
        </nav>
    </div>
}