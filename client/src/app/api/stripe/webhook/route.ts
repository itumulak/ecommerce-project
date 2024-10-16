import { Stripe } from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "../../../../lib/orderMongoDB";
import Order from "../../../../models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    const signature = request.headers.get('stripe-signature') as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET as string;
    let event: any;

    try {
        const arrayBuffer = await request.arrayBuffer();
        const bufferData = Buffer.from(arrayBuffer);

        event = stripe.webhooks.constructEvent(
            bufferData,
            signature,
            endpointSecret
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const newOrder = {
            userId: session.metadata?.userId,
            sessionId: session.id,
            paymentStatus: session.payment_status,
            amountTotal: session.amount_total,
            currency: session.currency,
            items: session.line_items?.data,
            createdAt: new Date(),
        };

        const order = new Order(newOrder);

        try {
            await connectToDatabase();
            const status = await order.save();

            return NextResponse.json({ status }, { status: 200 });
        } catch (error) {
            console.error("Error creating order", error);
            return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}   