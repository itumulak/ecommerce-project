import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../../lib/firebaseClient";
import { AuthRequestBody } from "../../../interface/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body: AuthRequestBody = await request.json();
        const { email, password } = body;
        console.log(body);
        

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            return NextResponse.json({ user: userCredential.user, message: 'User created successfully' }, { status: 200 });
        } catch (error: Error | any) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}