import CheckoutTotal from "@/components/CheckoutTotal";
import Link from "next/link";
import { BsArrowLeftSquare } from "react-icons/bs";

export default function CheckoutPage() {

    return <>
        <div>
            <h2 className="text-2xl">Contact</h2>
            <label>Email
                <input type="text" className="input-field block" /></label>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Shipping Address</h2>
            <label>Country/Region
                <input type="select" className="input-field block w-full" /></label>
            <div className="grid grid-cols-2 gap-4">
                <label>First Name (Optional)
                    <input type="text" className="input-field block w-full" /></label>
                <label>Last Name
                    <input type="text" className="input-field block w-full" /></label>
            </div>
            <label>Address
                <input type="text" className="input-field block w-full" /></label>
            <div className="grid grid-cols-3 gap-4">
                <label>City
                    <input type="text" className="input-field block w-full" /></label>
                <label>State
                    <input type="text" className="input-field block w-full" /></label>
                <label>Zipcode
                    <input type="text" className="input-field block w-full" /></label>
            </div>
            <label>Phone
                <input type="phone" className="input-field block w-full" /></label>
        </div>
        <div className="flex justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-blue-400"><BsArrowLeftSquare />Return to cart</Link>
            <Link href="/checkout/payment"><button className="button w-fit p-4 bg-cyan-700 rounded-lg self-end">Continue to Payment</button></Link>
        </div>
    </>
}