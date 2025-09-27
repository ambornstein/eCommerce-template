import dbConnect from "@/lib/db";
import { InventoryRecord } from "@/lib/models/inventoryRecord";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const products = await InventoryRecord.find({}).populate('product').exec()

        return NextResponse.json(products)
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}

export async function PATCH(request: NextRequest) {
    await dbConnect();
    const data: Array<any> = await request.json()
    try {
        data.forEach((value) => InventoryRecord.findByIdAndUpdate(value._id, {...value}).exec())

        return new NextResponse("Updated Inventory", { status: 200 })
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}