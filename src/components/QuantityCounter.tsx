import { BiMinus, BiPlus } from "react-icons/bi";

export default function QuantityCounter(props: { quantity: number, setQuantity: (q: number) => void }) {
    return <div className="grid grid-cols-3 place-items-center w-40 panel-outline h-12">
        <BiMinus className="size-8" onClick={() => {
            if (props.quantity - 1 >= 1) {
                props.setQuantity(props.quantity - 1)
            }
        }} />
        <span>{props.quantity}</span>
        <BiPlus className="size-8" onClick={() => props.setQuantity(props.quantity + 1)} />
    </div>
}