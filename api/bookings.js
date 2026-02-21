import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    try {
        await client.connect();
        const database = client.db('rohatours'); // Ensure this matches your Atlas DB name
        const bookings = database.collection('bookings');

        // HANDLE GET REQUEST (Fetching trips for the dashboard)
        if (req.method === 'GET') {
            const allBookings = await bookings.find({}).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(allBookings);
        }

        // HANDLE POST REQUEST (Saving a new booking)
        if (req.method === 'POST') {
            const newBooking = {
                ...req.body,
                createdAt: new Date(),
                status: req.body.status || 'pending'
            };
            const result = await bookings.insertOne(newBooking);
            return res.status(201).json({ message: 'Booking created', id: result.insertedId });
        }

        // IF METHOD IS NOT GET OR POST
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}