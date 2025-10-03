'use client'

import { imageBaseUrl } from "@/lib/config"
import { imageUrlOrFallback } from "@/lib/util"
import Image from "next/image"
import { useState } from "react"

export default function ImageGallery(props: { imageUrls: string[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return <div className="flex flex-row w-full h-[525px]">
        <div className="flex flex-col gap-2 w-fit">
            {props.imageUrls.length > 0 ?
                props.imageUrls?.map((value, idx) =>
                    <Image width={300} height={300} alt="Image"
                        src={imageBaseUrl + value} key={idx} className="object-cover size-36 p-4 panel-outline" onClick={() => setSelectedIndex(idx)} />)
                : <Image width={300} height={300} alt="Image" src={'/file.svg'} />
            }
        </div>
        <div className="m-4 w-xl">
            <Image width={500} height={500} alt="Image" src={imageUrlOrFallback(props.imageUrls[selectedIndex])} className="w-full" />
        </div>
    </div>
}