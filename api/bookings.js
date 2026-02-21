import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Global cached connection for serverless performance
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    // If the database connection is cached, use it
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    if (!uri) {
        console.error('CRITICAL: MONGODB_URI is missing from environment variables');
        throw new Error('MONGODB_URI environment variable is not defined');
    }

    try {
        // Removed deprecated 'useNewUrlParser' and 'useUnifiedTopology'
        // These are now default behavior in the modern MongoDB driver (v4+).
        const client = new MongoClient(uri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        await client.connect();
        const db = client.db('rohatours');

        cachedClient = client;
        cachedDb = db;
        
        console.log('Successfully connected to MongoDB Atlas');
        return { client, db };
    } catch (e) {
        console.error('MongoDB Connection Error:', e.message);
        throw new Error(`Failed to connect to database: ${e.message}`);
    }
}

export default async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { db } = await connectToDatabase();
        const bookings = db.collection('bookings');

        // GET: Fetch all bookings
        if (req.method === 'GET') {
            const allBookings = await bookings.find({}).sort({ createdAt: -1 }).limit(50).toArray();
            return res.status(200).json(allBookings);
        }

        // POST: Create a new booking
        if (req.method === 'POST') {
            const { customerName, customerEmail, package: pkg, travelerCount } = req.body;

            if (!customerName || !customerEmail) {
                return res.status(400).json({ success: false, message: 'Customer name and email are required.' });
            }

            const newBooking = {
                customerName,
                customerEmail,
                package: pkg || 'General Inquiry',
                travelerCount: parseInt(travelerCount) || 1,
                status: 'pending',
                createdAt: new Date()
            };

            const result = await bookings.insertOne(newBooking);
            return res.status(201).json({ 
                success: true, 
                message: 'Booking successfully created', 
                id: result.insertedId 
            });
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        console.error("API Route Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
}