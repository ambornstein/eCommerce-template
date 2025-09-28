import { Collection } from "@/lib/models/collection";

export async function GET(request: Request) {
    try {
        const collections = await Collection.find({}).populate('subcollections').exec()
        return new Response(JSON.stringify(collections), { status: 200 })
    } catch (error) {
        console.error("Failed to create collection:", error);
        return new Response("Failed to create collection", { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const collection = await request.json()

        const existing = await Collection.findOne(collection);
        if (!existing) {
            const newCollection = await new Collection(collection)
            await newCollection.save();
            return new Response(`Collection ${collection.label} has been created successfully`, { status: 200 })
        }
        else {
            return new Response("A collection with this label exists already", { status: 400 })
        }

    } catch (error) {
        console.error("Failed to create collection:", error);
        return new Response("Failed to create collection", { status: 500 })
    }
}