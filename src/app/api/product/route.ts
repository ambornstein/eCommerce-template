import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const params = Object.fromEntries(request.nextUrl.searchParams)

        let filter = {}
        if (!!params['collection']) {
            filter = { ...filter, collection: params['collection'] }

            if (!!params['subcollection']) {
                filter = { ...filter, subcollection: params['subcollection'] }
            }
        }

        if (!!params['page']) {
            const perPage = Number(params['perPage'])
            const page = Number(params['page'])
            const products = await Product.find(filter).skip((page - 1) * perPage).limit(perPage)

            return NextResponse.json(products)
        }
        else {
            const products = await Product.find(filter)

            return NextResponse.json(products)
        }
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
        console.log(e)
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}