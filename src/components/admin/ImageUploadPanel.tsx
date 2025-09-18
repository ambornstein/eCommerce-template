'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Modal from "../Modal"
import { BiPlus } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { imageBaseUrl } from "@/lib/config"

const ImageChip = (props: { imageUrl: string, imageName: string, remove: () => void }) => {
    return <div className="h-fit w-64 p-1 grid grid-cols-[auto_1fr_20px] gap-2 items-center outline-1 outline-zinc-700 rounded-md ">
        <img className="object-contain size-24" src={props.imageUrl} />
        <p>{props.imageName}</p>
        <CgClose onClick={props.remove} />
    </div>
}

function ImageSelectOption(props: { imageUrl: string, imageName: string, deleteImage: () => void }) {
    return <div className="has-checked:outline-emerald-500 outline-2 outline-zinc-600 rounded-md p-1">
        <div className="flex justify-between py-1">
            <input type="checkbox" name="image" className="size-4" value={props.imageName} />
            <CgClose onClick={props.deleteImage} />
        </div>
        <img key={props.imageName} src={props.imageUrl} />
    </div>
}

interface ImagePanelProps {
    addImages: (imageNames: string[]) => void,
    removeImage: (index: number) => void,
    images: string[]
}

export default function ImageUploadPanel(props: ImagePanelProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<any[]>()

    useEffect(() => {
        fetchUploadedImages()
    }, [])

    function uploadImage(e: ChangeEvent<HTMLInputElement>) {
        const image = e.target.files![0]

        fetch(`/api/upload?filename=${image.name}`, {
            method: "POST",
            body: image
        }).then(fetchUploadedImages)
    }

    async function fetchUploadedImages() {
        const data = await fetch('/api/images').then(res => res.json())
        setUploadedImages(data)
    }

    function deleteUploadedImage(imageName: string) {
        if (confirm("Really delete uploaded image " + imageName + "?")) {
            fetch(`/api/images?filename=${imageName}`, { method: 'DELETE' }).then(() => fetchUploadedImages())
        }
    }

    function selectImages(formEvent: FormEvent) {
        formEvent.preventDefault()
        const formData = new FormData(formEvent.target as HTMLFormElement)

        const images = formData.getAll('image')

        props.addImages(images.map(m => m.toString()))
    }

    return <div className="panel" >
        <div className="flex flex-col gap-4 items-center" >
            <div className="rounded-lg outline cursor-pointer w-full place-items-center" onClick={() => setMenuOpen(!menuOpen)}>
                <BiPlus className="size-12" />
                <p>Add Images</p>
            </div>
            {props.images?.map((i, j) =>
                <ImageChip imageName={i} key={j} imageUrl={imageBaseUrl + i} remove={() => props.removeImage(j)} />)
            }
        </div>

        <Modal setIsOpen={setMenuOpen} isOpen={menuOpen}>
            <div className="flex flex-col gap-4 p-4">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center outline-dashed outline-2 rounded-lg outline-zinc-700 w-full h-36 cursor-pointer hover:bg-zinc-300 ">
                    <img className="size-12" src='/image.svg' />
                    <p><b>Click to upload image</b></p>
                    <input id="dropzone-file" type="file" accept="image/jpeg, image/png" className="hidden" onChange={uploadImage} />
                </label>
                <h3 className="text-xl font-semibold">Select Images to Add</h3>
                <form className="flex flex-col gap-4" onSubmit={selectImages}>
                    <div className="overflow-y-scroll p-1 h-86">
                        <div className="grid grid-cols-3 gap-4">
                            {uploadedImages?.map((i, j) => <ImageSelectOption key={j} imageName={i.pathname} imageUrl={i.url} deleteImage={() => deleteUploadedImage(i.pathname)} />)}
                        </div>
                    </div>
                    <input type="submit" className="button self-end w-fit" />
                </form>
            </div>
        </Modal>
    </div >
}