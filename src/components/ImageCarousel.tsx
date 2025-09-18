import { imageBaseUrl } from "@/lib/config";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel(props: { imageUrls: string[] }) {
    const [index, setIndex] = useState(0)
    
    return <div className="h-48 w-96 bg-zinc-500 flex flex-row overflow-hidden">
        {props.imageUrls.map((value, idx) =>
            <Image width={200} height={200} alt="Image" src={imageBaseUrl + value} />
        )}
    </div>
}