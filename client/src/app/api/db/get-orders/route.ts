import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/orderMongoDB";

export async function POST(request: Request) {
    const { userId } = await request.json();    

    if ( ! userId) {
        return NextResponse.json({ message: "userId is required" }, { status: 400 })
    }    

    try {
        const { db } = await connectToDatabase();
        const orders = await db.collection("orders").find({ userId }).toArray();

        if ( ! orders.length ) {
            return NextResponse.json({ message: "No orders found" }, { status: 404 })
        }

        return NextResponse.json({ orders }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}