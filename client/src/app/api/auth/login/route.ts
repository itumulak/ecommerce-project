import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthRequestBody  } from "../../../interface/auth";
import { auth } from "../../../../lib/firebaseClient";

export async function POST(request: Request) {
    try {
        const body: AuthRequestBody = await request.json();
        const { email, password } = body;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        const response = NextResponse.json({ user: userCredential.user }, { status: 200 });
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }        
}