import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

import { db } from "../../../../lib/firebaseClient";

export async function POST(request: Request) {
    const { userId, orderId } = await request.json();  
    
    if ( ! userId || ! orderId) {
        return NextResponse.json({ message: "userId and orderId are required" }, { status: 400 })
    }

    try {

        let order = null;        
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const orderData = docSnap.data();

            if (orderData.userId === userId) {
                order = {
                    _id: docSnap.id,
                    ...orderData
                }
            }
        }

        if ( ! order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 })
        }
        else {
            return NextResponse.json({ order }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}