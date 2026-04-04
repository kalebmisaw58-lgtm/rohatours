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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');

        if (req.method === 'GET') {
            const allBookings = await bookings.find({}).sort({ createdAt: -1 }).limit(100).toArray();
            return res.status(200).json(allBookings);
        }

        if (req.method === 'POST') {
            const { customerName, customerEmail, customerPhone, travelDate, package: pkg, travelerCount } = req.body;

            if (!customerName || !customerEmail) {
                return res.status(400).json({ success: false, message: 'Name and email are required.' });
            }

            const newBooking = {
                customerName,
                customerEmail,
                customerPhone: customerPhone || '',
                travelDate: travelDate || '',
                package: pkg || 'General Inquiry',
                travelerCount: parseInt(travelerCount) || 1,
                status: 'pending',
                createdAt: new Date()
            };

            const result = await bookings.insertOne(newBooking);
            return res.status(201).json({ success: true, message: 'Booking received', id: result.insertedId });
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ 
            success: false, 
            message: error.message.includes('MONGODB_URI') 
                ? 'Database not configured. MONGODB_URI missing.' 
                : 'Internal Server Error', 
            error: error.message 
        });
    }
}
