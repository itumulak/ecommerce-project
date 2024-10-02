import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "../../../../lib/firebaseAdmin";

export async function POST(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {    
        return NextResponse.json({ error: 'Token did not exist' }, { status: 401 })
    }

    try {
        const decodedToken = await authAdmin.verifyIdToken(token)
        const user = await authAdmin.getUser(decodedToken.uid)

        return NextResponse.json({ user, token }, { status: 200 })
    } catch (error) {
        request.cookies.delete('token')
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}