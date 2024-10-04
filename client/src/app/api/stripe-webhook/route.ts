import { Stripe } from "stripe";
import { buffer } from "micro";

import { connectToDatabase } from "../../../lib/orderMongoDB";
import Order from "../../models/Order";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    const signature = request.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET as string;
    let event: any;

    try {
        const buff = await buffer(request)
        event = stripe.webhooks.constructEvent(
            buff,
            signature,
            endpointSecret
        )
    } catch (error) {
        return response.status(400).send(`Webhook error: ${error.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const newOrder = {
            userId: session.metadata.userId,
            sessionId: session.id,
            paymentStatus: session.payment_status,
            amountTotal: session.amount_total,
            currency: session.currency,
            items: session.line_items.data,
            createdAt: new Date()
        }
        const order = new Order(newOrder)

        try {
            await connectToDatabase()
            const status = await order.save()

            return response.status(200).json({ status })
        } catch (error) {
            console.error("Error creating order", error);
            return response.status(500).json({ error: 'Error creating order' });
        }
    }
}