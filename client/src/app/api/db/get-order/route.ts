import { NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/orderMongoDB";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    const { userId, orderId } = await request.json();    

    if ( ! userId || ! orderId) {
        return NextResponse.json({ message: "userId and orderId are required" }, { status: 400 })
    }

    try {
        const { db } = await connectToDatabase();
        const order = await db.collection("orders").findOne({ userId, _id: new ObjectId(orderId) });

        if ( ! order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 })
        }

        return NextResponse.json({ order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}