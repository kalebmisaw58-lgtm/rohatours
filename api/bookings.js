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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Staff-Token');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');

        if (req.method === 'GET') {
            // GET requires staff token — used by staff dashboard and My Trips
            const token = req.headers['x-staff-token'];
            const staffToken = process.env.STAFF_PASSWORD;

            // If staff token provided, return all bookings
            if (token && staffToken && token === staffToken) {
                const allBookings = await bookings.find({}).sort({ createdAt: -1 }).limit(500).toArray();
                return res.status(200).json(allBookings);
            }

            // Otherwise require email param — return only that user's bookings
            const { email } = req.query;
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ success: false, message: 'Valid email query parameter required.' });
            }
            const userBookings = await bookings.find({ customerEmail: email }).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(userBookings);
        }

        if (req.method === 'POST') {
            const { customerName, customerEmail, customerPhone, travelDate, package: pkg, travelerCount } = req.body;

            if (!customerName || !customerName.trim()) {
                return res.status(400).json({ success: false, message: 'Name is required.' });
            }
            if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
                return res.status(400).json({ success: false, message: 'A valid email is required.' });
            }

            const newBooking = {
                customerName: customerName.trim(),
                customerEmail: customerEmail.toLowerCase().trim(),
                customerPhone: customerPhone || '',
                travelDate: travelDate || '',
                package: pkg || 'General Inquiry',
                travelerCount: Math.max(1, parseInt(travelerCount) || 1),
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
