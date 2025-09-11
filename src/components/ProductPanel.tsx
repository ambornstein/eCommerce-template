import Image from "next/image"

export default function ProductPanel() {
    return <div className="flex flex-col items-center bg-zinc-300">
        <Image width={100} height={100} src={'/favicon.ico'} alt='Home' className="w-auto" />
        <button></button>
        <dl className="grid grid-cols-2 grid-rows-2 items-center place-items-center">
            <dt>Product Name</dt>
            <dd>$5</dd>
            <dt>In stock:</dt>
            <dd>12</dd>
        </dl>
    </div>
}