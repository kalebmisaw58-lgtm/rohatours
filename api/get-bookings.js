import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    if (!uri) throw new Error('MONGODB_URI environment variable is not defined');
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db('rohatours');
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    try {
        const { db } = await connectToDatabase();
        const bookings = await db.collection('bookings')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
