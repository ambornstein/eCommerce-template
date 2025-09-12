import dbConnect from "@/lib/db";
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