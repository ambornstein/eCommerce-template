'use client'

import { clamp, getBaseUrl } from "@/lib/util";
import { useEffect, useState } from "react";

function RecordRow(props: { record: any, index: number, updateRecords: (id: string, obj: any) => void }) {
    const [stockCount, setStockCount] = useState<number>(props.record.stockCount)
    const [unavailableCount, setUnavailableCount] = useState<number>(props.record.unavailableCount)

    useEffect(() => {
        setUnavailableCount(clamp(0, stockCount, unavailableCount))
        props.updateRecords(props.record._id, { stockCount, unavailableCount })
    }, [unavailableCount, stockCount])

    return <tr key={props.index}>
        <td>{props.record.product.name}</td>
        <td><input className="number-cell" pattern="[1-9]\d*" type="number" step={1} min={0} value={unavailableCount}
            onChange={(e) => setUnavailableCount(clamp(0, stockCount, Number(e.target.value)).valueOf())} /></td>
        <td>0</td>
        <td>{stockCount - unavailableCount}</td>
        <td><input className="number-cell" pattern="[1-9]\d*" type="number" step={1} min={0} value={stockCount} onChange={(e) => setStockCount(Number(e.target.value).valueOf())} /></td>
    </tr>
}

export default function InventoryUpdateTable(props: { inventoryItems: Array<any> }) {
    const [updatedItems, setUpdatedItems] = useState<{
        _id: string,
        unavailableCount: number,
        stockCount: number
    }[]>([])

    function pushUpdate(id: string, updateObject: any) {
        console.log(updateObject)
        const items = [...updatedItems]

        const index = items.findIndex((item) => item._id == id)
        if (index >= 0) {
            items[index].stockCount = updateObject.stockCount
            items[index].unavailableCount = updateObject.unavailableCount
            setUpdatedItems(items)
        }
        else{
            setUpdatedItems([...updatedItems, {_id: id, ...updateObject}])
        }
    }

    function saveUpdate() {
        console.log(updatedItems)
        fetch(`${getBaseUrl()}/api/product/inventory`, { method: 'PATCH', body: JSON.stringify(updatedItems) })
    }

    return <div>
        <table className="w-full border-spacing-y-2 border-separate">
            <thead className="data-header">
                <tr className="*:text-left">
                    <th>Product</th>
                    <th>Unavailable</th>
                    <th>Commited to Order</th>
                    <th>Available</th>
                    <th>In Stock</th>
                </tr>
            </thead>
            <tbody>
                {props.inventoryItems.map((record: any, idx) =>
                    <RecordRow record={record} index={idx} updateRecords={pushUpdate} />)}
            </tbody>
        </table>
        <button className="button" onClick={saveUpdate}>Save</button>
    </div>
}