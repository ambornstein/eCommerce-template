'use client'

import { CollectionData, SubCollectionData } from "@/lib/types";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

function SingleEntryForm(props: { buttonText: string, action: (form: FormData) => void }) {
    return <form className="flex gap-2" action={props.action}>
        <input name="label" type="text" className="input-field" />
        <button className="cursor-pointer panel-outline rounded-sm flex-natural pl-1 pr-2">
            <BiPlus className="standard-icon inline" />
            <p className="inline">{props.buttonText}</p>
        </button>
    </form>
}

export default function CollectionsPage() {
    const [collections, setCollections] = useState<CollectionData[]>([])

    function fetchCollections() {
        fetch('/api/collection').then(res => res.json()).then(data => setCollections(data))
    }
    
    useEffect(() => {
        fetchCollections()
    }, [])

    async function submitCollection(e: FormData) {
        if (e.get("label"))
            await fetch('/api/collection', { method: 'POST', body: JSON.stringify(Object.fromEntries(e)) })
            fetchCollections()
    }

    async function submitSubcollection(collSlug: string, e: FormData) {
        if (e.get("label"))
            await fetch(`/api/collection/${collSlug}/subcollection`, { method: 'POST', body: JSON.stringify(Object.fromEntries(e)) })
            fetchCollections()
    }

    async function deleteCollection(collSlug: string) {
        if (!confirm("Really delete " + collSlug + "?")) return

        await fetch(`/api/collection/${collSlug}`, { method: 'DELETE' })
        fetchCollections()
    }

    async function deleteSubcollection(collSlug: string, subcollection: SubCollectionData) {
        if (!confirm("Really delete " + subcollection.label + "?")) return

        await fetch(`/api/collection/${collSlug}/subcollection/`, { method: 'DELETE', body: JSON.stringify(subcollection) })
        fetchCollections()
    }

    return <div className="panel p-2 w-full min-h-96">
        <h2>Collections</h2>
        <p>To split products into groups, use collections. Products can be assigned to a specific collection and even a sub-collection, but if they don&apos;t have either of these, they will only show up in &quot;All Products&quot;.</p>
        <div className="flex flex-col gap-4 mt-8">
            <label>New Collection</label>
            <SingleEntryForm buttonText="Create Collection" action={submitCollection} />
            {collections.map((collection, index) =>
                <div key={index} className="panel-outline p-2 rounded-md h-fit">
                    <div className="occupy-space">
                        <h2>{collection.label}</h2>
                        <div className="flex-natural">
                            <span>Delete</span>
                            <CgClose className="standard-icon" onClick={() => deleteCollection(collection.slug)} />
                        </div>
                    </div>
                    <details>
                        <summary>Subcollections</summary>
                        <SingleEntryForm buttonText="Add Subcollection" action={(form) => submitSubcollection(collection.slug, form)} />
                        <div className="flex flex-wrap w-full gap-2 mt-4">
                            {collection.subcollections.map((sub, index) => <div key={index} className="flex-natural bg-white px-2 rounded-full outline-1 outline-zinc-500">
                                <p>{sub.label}</p>
                                <CgClose className="size-4" onClick={() => deleteSubcollection(collection.slug, sub)} />
                            </div>)}
                        </div>
                    </details>
                </div>
            )}
        </div>
    </div>
}