import { NextResponse } from "next/server";
import { fetchSignInMethodsForEmail, updatePassword, updateEmail, updateProfile } from "firebase/auth";

import { AuthRequestBody  } from "../../../../interface/auth";
import { auth } from "../../../../../lib/firebaseClient";

export async function POST(request: Request) {
    try {
        const body: AuthRequestBody = await request.json();
        const { email, currentEmail, password, confirmPassword, fullName, currentFullName } = body;

        if (currentEmail !== email && email === "") {
            return NextResponse.json({ error: 'Email should not be empty' }, { status: 400 });
        }

        if (currentEmail !== email && !validateEmail(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email)

            if (signInMethods.length > 0) {
                return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
            }

            console.log(signInMethods);            

            if ( email !=="" && email !== currentEmail) {
                await updateEmail(auth.currentUser, email)
            }
        } catch (error) {
            return NextResponse.json({ error: `Something went wrong. ${error}` }, { status: 500 });    
        }

        if (password !== "" && password === confirmPassword) {
            try {
                await updatePassword(auth.currentUser, password);
            } catch (error) {
                return NextResponse.json({ error: `Something went wrong. ${error}.` }, { status: 500 });
            }
        }

        if (fullName !== "" || fullName !== currentFullName) {
            try {
                await updateProfile(auth.currentUser, { displayName: fullName });
            } catch (error) {
                return NextResponse.json({ error: 'Something went wrong. Cannot your update name.' }, { status: 500 });
            }
        }

        return NextResponse.json({ message: 'Profile information updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong. Cannot process your request.' }, { status: 500 });
    }
}

const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}
