import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { sendBookingStatusUpdate } from '@/lib/email';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';
const VALID_STATUSES = ['pending', 'confirmed', 'cancelled'];

function setCorsHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    response.headers.set('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Staff-Token');
    return response;
}

export async function OPTIONS() {
    const res = new NextResponse(null, { status: 200 });
    return setCorsHeaders(res);
}

export async function PATCH(request) {
    const token = request.headers.get('x-staff-token');
    const staffToken = process.env.STAFF_PASSWORD;

    if (!token || !staffToken || token !== staffToken) {
        const res = NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
        return setCorsHeaders(res);
    }

    try {
        const body = await request.json().catch(() => ({}));
        const { id, status } = body;

        if (!id || !status) {
            const res = NextResponse.json({ success: false, message: 'id and status required' }, { status: 400 });
            return setCorsHeaders(res);
        }

        if (!VALID_STATUSES.includes(status)) {
            const res = NextResponse.json(
                { success: false, message: `status must be one of: ${VALID_STATUSES.join(', ')}` },
                { status: 400 }
            );
            return setCorsHeaders(res);
        }

        const { db } = await connectToDatabase();
        let objectId;
        try {
            objectId = new ObjectId(id);
        } catch {
            const res = NextResponse.json({ success: false, message: 'Invalid booking ID' }, { status: 400 });
            return setCorsHeaders(res);
        }

        const existing = await db.collection('bookings').findOne({ _id: objectId });
        if (!existing) {
            const res = NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
            return setCorsHeaders(res);
        }

        await db.collection('bookings').updateOne(
            { _id: objectId },
            { $set: { status, updatedAt: new Date() } }
        );

        // Send status email to customer asynchronously
        sendBookingStatusUpdate(existing, status).catch(err => console.error('Status update email error:', err));

        const res = NextResponse.json({ success: true, message: 'Booking updated' }, { status: 200 });
        return setCorsHeaders(res);

    } catch (error) {
        console.error('Update error:', error);
        const res = NextResponse.json({ success: false, error: error.message }, { status: 500 });
        return setCorsHeaders(res);
    }
}
