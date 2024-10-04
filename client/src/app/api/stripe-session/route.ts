import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: Request, response: NextApiResponse) {
    const body = await request.json()
    const { sessionId } = body        

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId as string)
        const items = await stripe.checkout.sessions.listLineItems(sessionId as string)
        return NextResponse.json({ session, items }, { status: 200 })
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}