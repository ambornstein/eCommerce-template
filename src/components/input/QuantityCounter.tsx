import { BiMinus, BiPlus } from "react-icons/bi";

export default function QuantityCounter(props: { quantity: number, setQuantity: (q: number) => void, maximum?: number }) {
    return <div className="w-40 h-12 grid grid-cols-3 place-items-center panel-outline select-none">
        <BiMinus className="size-8" onClick={() => {
            if (props.quantity - 1 > 0) {
                props.setQuantity(props.quantity - 1)
            }
        }} />
        <span>{props.quantity}</span>
        <BiPlus className="size-8" onClick={() => {
            if (props.quantity + 1 <= props.maximum!) {
                props.setQuantity(props.quantity + 1)
            }
        }} />
    </div>
}