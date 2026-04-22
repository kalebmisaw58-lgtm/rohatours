const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';

// Simple in-memory rate limiter: max 5 attempts per IP per 15 minutes
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

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ success: false, message: 'Too many login attempts. Please try again in 15 minutes.' });
    }

    const { email, password } = req.body || {};

    const validEmail = process.env.STAFF_EMAIL;
    const validPassword = process.env.STAFF_PASSWORD;

    if (!validEmail || !validPassword) {
        return res.status(500).json({ success: false, message: 'Server auth not configured.' });
    }

    if (email === validEmail && password === validPassword) {
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
}
