'use client'

export default function NewProductPage() {
    return <form className="flex flex-col gap-2">
        <div className="panel flex flex-col gap-4">
            <label>Title
                <input type="text" className="input-field " />
            </label>
            <label>Description
                <textarea className="input-field block" />
            </label>
        </div>
        <div className="panel">
            <label>Price
                <input type="number" step="0.01" min="0.00" placeholder="0.00" defaultValue="0.00" className="input-field pl-6" />
            </label>
            <span className="absolute -translate-y-7 translate-x-2">$</span>
        </div>
        <div className="panel">
            <label>Category
                <input type="text" className="input-field" />
            </label>
        </div>
        <input type="submit" className="button self-end"/>
    </form>
}