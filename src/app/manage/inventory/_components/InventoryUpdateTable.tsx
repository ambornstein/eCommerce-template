'use client'

import { InventoryRecord } from "@/lib/types";
import { getBaseUrl } from "@/lib/util";
import { useState } from "react";

function RecordRow(props: { record: InventoryRecord, index: number, updateRecords: (id: string, obj: any) => void }) {
    const [stockCount, setStockCount] = useState<number>(props.record.stockCount)

    return <tr key={props.index}>
        <td>{props.record.product.name}</td>
        <td>{props.record.orderedCount}</td>
        <td>{stockCount - props.record.orderedCount}</td>
        <td><input className="number-cell" type="number" step={1} min={0} value={stockCount} onChange={(e) => {
            setStockCount(Number(e.target.value).valueOf())
            props.updateRecords(props.record._id, { stockCount: Number(e.target.value) })
        }} /></td>
    </tr>
}

export default function InventoryUpdateTable(props: { inventoryItems: Array<InventoryRecord> }) {
    const [updatedItems, setUpdatedItems] = useState<InventoryRecord[]>([])

    function pushUpdate(id: string, updateObject: any) {
        const index = updatedItems.findIndex((item) => item._id == id)

        if (index >= 0) {
            updatedItems[index].stockCount = updateObject.stockCount
            setUpdatedItems(updatedItems)
        }
        else {
            setUpdatedItems([...updatedItems, { _id: id, ...updateObject }])
        }
    }

    function saveUpdate() {
        fetch(`${getBaseUrl()}/api/product/inventory`, { method: 'PATCH', body: JSON.stringify(updatedItems) })
    }

    return <div>
        <table className="w-full border-spacing-y-2 border-separate">
            <thead className="data-header">
                <tr className="*:text-left">
                    <th>Product</th>
                    <th>Commited to Order</th>
                    <th>Available</th>
                    <th>In Stock</th>
                </tr>
            </thead>
            <tbody>
                {props.inventoryItems.map((record: InventoryRecord, idx) =>
                    <RecordRow record={record} key={idx} index={idx} updateRecords={pushUpdate} />)}
            </tbody>
        </table>
        <button className="button" onClick={saveUpdate}>Save</button>
    </div>
}