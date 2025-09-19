import Image from "next/image"

export default function HeroCollection() {
    return <div className="m-auto max-w-[90%] grid grid-cols-1 lg:grid-cols-2 place-items-center bg-neutral-200 p-4 ">
        <Image width={100} height={100} src={'/favicon.ico'} alt='Home' className="h-[50vh] w-auto aspect-square object-contain" />
        <div>
            <h2 className="text-2xl">Collection</h2>
            <button>See More</button>
        </div>
    </div>
}