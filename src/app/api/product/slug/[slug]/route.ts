import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;
    try {
        const product = await Product.findOne({slugName: slug})

        return NextResponse.json(product)
    } catch (e) {
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}