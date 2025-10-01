import { Collection, SubCollection } from "@/lib/models/collection";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        const collection = await Collection.findOne({ slug: slug }).populate('subcollections').exec()

        return new Response(JSON.stringify(collection), { status: 200 })
    } catch (error) {
        console.error("Failed to create collection:", error);
        return new Response("Failed to create collection", { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        const collection = await Collection.findOneAndDelete({ slug: slug })

        return new Response(`Deleted collection ${collection.label}`, { status: 200 })
    } catch (error) {
        console.error("Failed to delete collection:", error);
        return new Response("Failed to delete collection", { status: 500 })
    }
}