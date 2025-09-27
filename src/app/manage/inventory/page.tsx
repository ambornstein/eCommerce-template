import { getBaseUrl } from "@/lib/util"
import InventoryUpdateTable from "./_components/InventoryUpdateTable";

export default async function InventoryPage() {
    const data = await fetch(`${getBaseUrl()}/api/product/inventory`)
    const inventory: Array<any> = await data.json();

    return <div className="panel p-2 flex flex-col gap-2">
        <h2>Inventory</h2>
        <InventoryUpdateTable inventoryItems={inventory} />
    </div>
}