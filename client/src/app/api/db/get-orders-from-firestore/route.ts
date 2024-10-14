import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../../../lib/firebaseClient";

export async function POST(request: Request) {
    const { userId } = await request.json();    

    if ( ! userId) {
        return NextResponse.json({ message: "userId is required" }, { status: 400 })
    }  

    try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const orders: any[] = [];

        querySnapshot.forEach((doc) => {
            orders.push({
                _id: doc.id,
                ...doc.data(),
            });
        });

        return NextResponse.json({ orders }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}