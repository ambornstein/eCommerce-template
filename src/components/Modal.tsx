'use client'

import { useEffect } from "react"
import { MdClose } from "react-icons/md"

export interface ModalProps {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {

    const close = () => setIsOpen(false)

    useEffect(() => {
        if (document != undefined) document.body.style.overflow = isOpen ? "hidden" : "unset"
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed top-0 left-0 w-full h-screen center">
            <div onClick={close} className="w-full h-full bg-stone-800/90" />
            <div className="flex flex-col fixed w-lg h-fit bg-slate-300 p-4">
                <MdClose onClick={close} className="self-end w-fit mb-4" />
                {children}
            </div>
        </div>)
}