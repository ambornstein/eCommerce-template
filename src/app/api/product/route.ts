import dbConnect from "@/lib/db";
import { Product } from "@/lib/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const params = Object.fromEntries(request.nextUrl.searchParams)

        let filter = {}
        let options = {}
        if (!!params['collection']) {
            filter = { ...filter, collection: params['collection'] }

            if (!!params['subcollection']) {
                filter = { ...filter, subcollection: params['subcollection'] }
            }
        }

        if (!!params['sort']) {
            options = {...options, sort: params['sort']}
        }
     
        if (!!params['page']) {
            const perPage = Number(params['perPage'] ?? 4)
            const page = Number(params['page'])
            options = {...options, skip: (page - 1) * perPage, limit: perPage}
        }

        const products = await Product.find(filter, null, options)
 
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
        console.log(e)
        if (e instanceof Error) {
            return new NextResponse(e.message, { status: 500 })
        }
        else {
            return new NextResponse("Something went wrong", { status: 500 })
        }
    }
}