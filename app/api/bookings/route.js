import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';

function setCorsHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Staff-Token');
    return response;
}

export async function OPTIONS() {
    const res = new NextResponse(null, { status: 200 });
    return setCorsHeaders(res);
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = request.headers.get('x-staff-token');
        const staffToken = process.env.STAFF_PASSWORD;

        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');

        // If staff token matches, return all bookings
        if (token && staffToken && token === staffToken) {
            const allBookings = await bookings.find({}).sort({ createdAt: -1 }).limit(500).toArray();
            const res = NextResponse.json(allBookings, { status: 200 });
            return setCorsHeaders(res);
        }

        // Otherwise require email query parameter
        const email = searchParams.get('email');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const res = NextResponse.json(
                { success: false, message: 'Valid email query parameter required.' },
                { status: 400 }
            );
            return setCorsHeaders(res);
        }

        const userBookings = await bookings.find({ customerEmail: email }).sort({ createdAt: -1 }).toArray();
        const res = NextResponse.json(userBookings, { status: 200 });
        return setCorsHeaders(res);

    } catch (error) {
        console.error('API Error:', error);
        const res = NextResponse.json(
            {
                success: false,
                message: error.message.includes('MONGODB_URI')
                    ? 'Database not configured. MONGODB_URI missing.'
                    : 'Internal Server Error',
                error: error.message,
            },
            { status: 500 }
        );
        return setCorsHeaders(res);
    }
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { customerName, customerEmail, customerPhone, travelDate, package: pkg, travelerCount } = body;

        if (!customerName || !customerName.trim()) {
            const res = NextResponse.json({ success: false, message: 'Name is required.' }, { status: 400 });
            return setCorsHeaders(res);
        }
        if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
            const res = NextResponse.json({ success: false, message: 'A valid email is required.' }, { status: 400 });
            return setCorsHeaders(res);
        }

        const newBooking = {
            customerName: customerName.trim(),
            customerEmail: customerEmail.toLowerCase().trim(),
            customerPhone: customerPhone || '',
            travelDate: travelDate || '',
            package: pkg || 'General Inquiry',
            travelerCount: Math.max(1, parseInt(travelerCount) || 1),
            status: 'pending',
            createdAt: new Date(),
        };

        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');
        const result = await bookings.insertOne(newBooking);

        const res = NextResponse.json(
            { success: true, message: 'Booking received', id: result.insertedId },
            { status: 201 }
        );
        return setCorsHeaders(res);

    } catch (error) {
        console.error('API Error:', error);
        const res = NextResponse.json(
            {
                success: false,
                message: error.message.includes('MONGODB_URI')
                    ? 'Database not configured. MONGODB_URI missing.'
                    : 'Internal Server Error',
                error: error.message,
            },
            { status: 500 }
        );
        return setCorsHeaders(res);
    }
}

