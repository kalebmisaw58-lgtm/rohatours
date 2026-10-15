import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';

function setCorsHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

export async function OPTIONS() {
    const res = new NextResponse(null, { status: 200 });
    return setCorsHeaders(res);
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { name, email, phone, subject, message } = body;

        if (!name || !name.trim()) {
            const res = NextResponse.json({ success: false, message: 'Name is required.' }, { status: 400 });
            return setCorsHeaders(res);
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const res = NextResponse.json({ success: false, message: 'A valid email is required.' }, { status: 400 });
            return setCorsHeaders(res);
        }
        if (!message || !message.trim()) {
            const res = NextResponse.json({ success: false, message: 'Message is required.' }, { status: 400 });
            return setCorsHeaders(res);
        }

        const { db } = await connectToDatabase();
        await db.collection('messages').insertOne({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone || '',
            subject: subject || 'General Inquiry',
            message: message.trim(),
            read: false,
            createdAt: new Date(),
        });

        const res = NextResponse.json({ success: true, message: 'Message received' }, { status: 201 });
        return setCorsHeaders(res);

    } catch (error) {
        console.error('Contact API error:', error);
        const res = NextResponse.json({ success: false, error: error.message }, { status: 500 });
        return setCorsHeaders(res);
    }
}

