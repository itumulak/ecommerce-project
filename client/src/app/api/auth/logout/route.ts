import { NextResponse } from "next/server";
import { signOut } from "firebase/auth";
import { auth } from "../../../../lib/firebaseClient";

export async function POST() {
    try {
        const status = await signOut(auth);

        return NextResponse.json({ status }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}