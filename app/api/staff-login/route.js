import { NextResponse } from 'next/server';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';

// In-memory rate limiter: max 5 attempts per IP per 15 minutes
const loginAttempts = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip) {
    const now = Date.now();
    const record = loginAttempts.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
    if (now > record.resetAt) {
        loginAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return false;
    }
    if (record.count >= RATE_LIMIT) return true;
    record.count++;
    loginAttempts.set(ip, record);
    return false;
}

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
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    if (isRateLimited(ip)) {
        const res = NextResponse.json(
            { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
            { status: 429 }
        );
        return setCorsHeaders(res);
    }

    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    const validEmail = process.env.STAFF_EMAIL;
    const validPassword = process.env.STAFF_PASSWORD;

    if (!validEmail || !validPassword) {
        const res = NextResponse.json(
            { success: false, message: 'Server auth not configured.' },
            { status: 500 }
        );
        return setCorsHeaders(res);
    }

    if (email === validEmail && password === validPassword) {
        const res = NextResponse.json({ success: true }, { status: 200 });
        return setCorsHeaders(res);
    }

    const res = NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
    );
    return setCorsHeaders(res);
}

