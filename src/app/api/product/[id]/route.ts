import { updateProductImages } from "@/lib/actions";
import dbConnect from "@/lib/db";
import { InventoryRecord } from "@/lib/models/inventoryRecord";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const products = await Product.findById(id)

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

    const formData = await request.formData();
    const images = formData.getAll('image').map(i => i.toString())

    try {
        formData.delete("id")
        
        await Product.findByIdAndUpdate(id, Object.fromEntries(formData))

        updateProductImages(id, images)

        return new NextResponse("Product " + id + " updated", { status: 200 })
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        await Product.findByIdAndDelete(id)
        await InventoryRecord.findOneAndDelete({product: id})

        return new NextResponse("Product " + id + " deleted", { status: 200 })
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}