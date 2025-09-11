import Image from "next/image"

export default function Header() {
    return <div className="w-full">
        <div className="h-fit px-16 py-4 flex flex-row items-center">
            <Image width={50} height={50} src={'/favicon.ico'} alt='Home' className="size-32"/>
            <div className="ml-auto flex gap-4">
                <Image width={40} height={40} src='/user.png' alt='Home' className="h-fit"/>
                <Image width={40} height={40} src='/shopping-bag.png' alt='Home' className="h-fit"/>
            </div>
        </div>
        <nav className="h-12 px-16 bg-zinc-300 flex gap-6 items-center uppercase">
            <a className="nav-link">Home</a>
            <a className="nav-link">All Products</a>
        </nav>
    </div>
}