import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    if (!uri) throw new Error('MONGODB_URI environment variable is not defined');
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db('RohaTours');
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'PATCH') return res.status(405).end('Method Not Allowed');

    try {
        const { id, status } = req.body;
        if (!id || !status) return res.status(400).json({ success: false, message: 'id and status required' });

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
