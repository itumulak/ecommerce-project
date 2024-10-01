import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/firebaseAdmin";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        await auth.verifyIdToken(token);

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path'],
}