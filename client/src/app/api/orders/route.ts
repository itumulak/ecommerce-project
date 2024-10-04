import { NextApiResponse } from "next";

import { connectToDatabase } from "../../../lib/orderMongoDB";
import Order from "../../models/Order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { session, items, userId } = body
    const { payment_intent: paymentIntentId, payment_status: paymentStatus, amount_total: amountTotal, currency } = session

    const newOrder = {
        userId,
        paymentIntentId,
        paymentStatus,
        amountTotal,
        currency,
        items: items.map((item: any) => ({
            amount: item.amount_total,
            quantity: item.quantity,
            title: item.description,
            currency: item.currency,
            price: item.price.unit_amount,
        })),
    }

    try {
        const { db } = await connectToDatabase()
        const existingOrder = await db.collection("orders").findOne({ paymentIntentId })

        if (! existingOrder ) {
            await db.collection("orders").insertOne(newOrder)
        }

        return NextResponse.json({ message: "Order created successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}