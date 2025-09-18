import { del, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const { blobs } = await list();
  return Response.json(blobs);
}

export async function DELETE(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get('filename')
  if (!filename) return new NextResponse("No image found with filename " + filename, { status: 404 })

  await del(filename)

  return new NextResponse("Deleted image " + filename, { status: 200 })
}