'use client'

import { imageBaseUrl } from "@/lib/config"
import Image from "next/image"
import { useState } from "react"

export default function ImageGallery(props: { imageUrls: string[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return <div className="grid grid-cols-[1fr_2fr] w-fit items-center">
        <div className="flex flex-col gap-2 w-fit shrink-0">
            {props.imageUrls?.map((value, idx) =>
                <Image width={300} height={300} alt="Image"
                    src={imageBaseUrl + value} key={idx} className="object-cover size-48 bg-zinc-200 p-4 " onClick={() => setSelectedIndex(idx)} />
            )}
        </div>
        <div className="w-md m-8 bg-zinc-200">
            <Image width={500} height={500} alt="Image" src={imageBaseUrl + props.imageUrls[selectedIndex]} />
        </div>
    </div>
}