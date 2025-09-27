import dbConnect from "@/lib/db";
import { InventoryRecord } from "@/lib/models/inventoryRecord";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const products = await InventoryRecord.findOne({ product: id }).populate('product').exec()

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    const data = await request.json()
    try {
        await Product.findByIdAndUpdate(id, )

        return new NextResponse("Product inventory" + id + " updated", { status: 200 })
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}