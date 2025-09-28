'use client'

import { useEffect } from "react"
import { MdClose } from "react-icons/md"

export interface ModalProps {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
    lockScrolling?: boolean
}

export default function Modal(props: ModalProps) {

    const close = () => props.setIsOpen(false)

    useEffect(() => {
        if (document != undefined && props.lockScrolling) {
            document.body.style.overflow = props.isOpen ? "hidden" : "unset"
        }
    }, [props.isOpen])

    if (!props.isOpen) return null

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-1 center">
            <div onClick={close} className="w-full h-full bg-zinc-300/50" />
            <div className="flex flex-col absolute w-fit h-fit bg-zinc-100 panel-outline pt-4">
                <MdClose onClick={close} className="absolute right-4 top-4 cursor-pointer size-6 " />
                {props.children}
            </div>
        </div>)
}