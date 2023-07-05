import { updateEntry } from "@/app/services/datahandler";

import { NextResponse } from "next/server";


export async function POST(request: Request, headers: Headers) {
    let result = await request.json();
    const entry = result;
    let returnval = updateEntry(result);

    return new NextResponse(JSON.stringify(returnval));

}