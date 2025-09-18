import { BiPlus } from "react-icons/bi";

export default function CollectionsPage() {
    return <div className="panel w-full h-48">
        <h2>Product Categories</h2>
        <div className="outline-1 w-full h-12">

        </div>
        <h2>Collections</h2>
        <div className="outline-1 flex flex-row items-center w-fit">
            <BiPlus className="size-8 inline"/>
            <p className="inline">Create Collection</p>
        </div>
    </div>
}