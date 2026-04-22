import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rohatours.vercel.app';
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
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required.' });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'A valid email is required.' });
        }
        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const { db } = await connectToDatabase();
        await db.collection('messages').insertOne({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone || '',
            subject: subject || 'General Inquiry',
            message: message.trim(),
            read: false,
            createdAt: new Date()
        });

        return res.status(201).json({ success: true, message: 'Message received' });
    } catch (error) {
        console.error('Contact API error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
