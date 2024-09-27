import { NextResponse } from "next/server";

import covertToSubcurrency from "../../../util/covertToSubcurrency";

const stripe =  require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: Request) {
    try {
        const { items  } = await request.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: covertToSubcurrency(item.price),
                    },
                    quantity: item.quantity
                }
            }),
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: covertToSubcurrency(0),
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 30,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 60,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: covertToSubcurrency(20),
                            currency: 'usd',
                        },
                        display_name: 'Fast Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 7,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 14,
                            },
                        },
                    },  
                }, 
            ],
            return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        })

        return NextResponse.json({ id: session.id, clientSecret: session.client_secret })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}