import Image from "next/image"

export default function HeroCollection() {
    return <div className="grid grid-cols-[1fr_1fr] place-items-center bg-neutral-200">
        <Image width={100} height={100} src={'/favicon.ico'} alt='Home' className="w-auto h-[700px]" />
        <div>
            <h2 className="text-2xl">Collection</h2>
            <button>See More</button>
        </div>
    </div>
}