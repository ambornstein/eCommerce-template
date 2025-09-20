'use client'

import { imageBaseUrl } from "@/lib/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ImageCarousel(props: { imageUrls: string[] }) {
    const [index, setIndex] = useState(0)
    const [shiftPercent, setShiftPercent] = useState(0)

    useEffect(() => {
        setShiftPercent(50 * index)
    }, [index])

    return <div className="overflow-hidden">
        <div className={`h-96 w-full bg-zinc-200 flex flex-row transition-all -translate-x-[${shiftPercent}%]`}>
            {props.imageUrls?.map((value, idx) =>
                <Image width={200} height={200} alt="Image" src={imageBaseUrl + value} key={idx} className="object-contain w-[50%]" />
            )}
        </div>
        <div className="absolute right-10 flex gap-2 *:size-6 translate-y-2">
            <FaArrowLeft className="cursor-pointer" onClick={() => {
                if (index - 1 >= 0)
                    setIndex(index - 1)
            }} />
            <FaArrowRight className="cursor-pointer" onClick={() => {
                if (index + 1 < props.imageUrls!.length)
                    setIndex(index + 1)
            }} />
        </div>
    </div>
}