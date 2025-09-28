import { Collection, SubCollection } from "@/lib/models/collection";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        const sub = await request.json()

        const subColl = await new SubCollection(sub)
        await subColl.save()

        const collection = await Collection.findOneAndUpdate({ slug: slug }, { $push: { subcollections: subColl._id } })

        return new Response(`Created subcollection ${subColl.label} on collection ${collection.label}`, { status: 200 })
    } catch (error) {
        console.error("Failed to create subcollection:", error);
        return new Response("Failed to create subcollection", { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        const sub = await request.json()

        const subCollection = await SubCollection.findOneAndDelete({ slug: sub.slug })
        const collection = await Collection.findOneAndUpdate({ slug: slug }, { $pull: { subcollections: subCollection._id } })
        
        return new Response(`Deleted subcollection ${collection.label}`, { status: 200 })
    } catch (error) {
        console.error("Failed to delete collection:", error);
        return new Response("Failed to delete collection", { status: 500 })
    }
}