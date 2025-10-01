'use client'

import Link from "next/link";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function PageSelector(props: { index: number, pageCount: number }) {

    const pageIndex = props.index;
    return <div className="m-auto flex gap-4 w-fit">
        {pageIndex > 1 && <Link href={`?page=${pageIndex - 1}`} className="flex-natural">
            <MdKeyboardDoubleArrowLeft/>Previous
        </Link>}

        <Link href={`?page=1`} className={`${pageIndex == 1 && 'border-b-2'}`}>1</Link>

        {pageIndex - 2 > 2 && <span>...</span>}

        {[-2, -1, 0, 1, 2].map((value) =>
            (pageIndex + value > 1 && pageIndex + value < props.pageCount)
                ? <Link href={`?page=${pageIndex + value}`} className={`${value == 0 && 'border-b-2'}`}>
                    {pageIndex + value}
                </Link>
                : null
        )}

        {pageIndex + 2 < props.pageCount - 1 && <span>...</span>}

        {props.pageCount > 1 && <Link href={`?page=${props.pageCount}`} className={`${pageIndex == props.pageCount && 'border-b-2'}`}>
            {props.pageCount}
        </Link>}

        {pageIndex < props.pageCount &&
            <Link href={`?page=${pageIndex + 1}`} className="flex-natural">
                Next<MdKeyboardDoubleArrowRight />
            </Link>}
    </div>
}