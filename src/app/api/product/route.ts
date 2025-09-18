import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const products = await Product.find({})

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

export async function POST(request: NextRequest) {
    await dbConnect();

    const formData = await request.formData()

    try {
        const products = await Product.insertOne(Object.fromEntries(formData))

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