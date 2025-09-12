'use client'
import { useState } from "react"
import Modal from "./Modal"

export default function ImageUploadPanel() {
    const [menuOpen, setMenuOpen] = useState(true)
    const [selectedImage, setSelectedImage] = useState<File>()

    return <div className="panel w-full" >



        <Modal setIsOpen={setMenuOpen} isOpen={menuOpen}>
            <div className="flex">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center outline-dashed outline-2 rounded-lg outline-zinc-700 w-full h-36 cursor-pointer hover:bg-zinc-300 ">
                    <img className="size-12" src='/image.svg'/>
                    <p><b>Click to upload image</b></p>
                    <input id="dropzone-file" type="file" accept="image/jpeg, image/png" className="hidden" 
                    onChange={e => {
                        const image = e.target.files![0]
                        setSelectedImage(image)
                        setMenuOpen
                    }}/>
                </label>
            </div>
        </Modal>
    </div >
}