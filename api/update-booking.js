import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        try { await cachedClient.db('admin').command({ ping: 1 }); }
        catch { cachedClient = null; cachedDb = null; }
    }
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    if (!uri) throw new Error('MONGODB_URI environment variable is not defined');
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db('RohaTours');
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled'];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Staff-Token');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'PATCH') return res.status(405).end('Method Not Allowed');

    // Require staff token
    const token = req.headers['x-staff-token'];
    const staffToken = process.env.STAFF_PASSWORD;
    if (!token || !staffToken || token !== staffToken) {
        return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    try {
        const { id, status } = req.body;
        if (!id || !status) return res.status(400).json({ success: false, message: 'id and status required' });
        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({ success: false, message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection('bookings').updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ success: false, message: 'Booking not found' });
        return res.status(200).json({ success: true, message: 'Booking updated' });
    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
