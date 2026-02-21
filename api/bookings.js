import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Global cached connection for serverless performance
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('rohatours'); // Ensure this matches your Atlas DB name

    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

export default async function handler(req, res) {
    // Set CORS headers if you are testing from different domains
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');

        // HANDLE GET REQUEST
        if (req.method === 'GET') {
            const allBookings = await bookings.find({}).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(allBookings);
        }

        // HANDLE POST REQUEST
        if (req.method === 'POST') {
            const { customerName, customerEmail, package: pkg, travelerCount } = req.body;

            // Simple validation
            if (!customerName || !customerEmail) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const newBooking = {
                customerName,
                customerEmail,
                package: pkg || 'Custom Expedition',
                travelerCount: parseInt(travelerCount) || 1,
                status: 'pending',
                createdAt: new Date()
            };

            const result = await bookings.insertOne(newBooking);
            return res.status(201).json({ 
                success: true, 
                message: 'Booking created', 
                id: result.insertedId 
            });
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
}