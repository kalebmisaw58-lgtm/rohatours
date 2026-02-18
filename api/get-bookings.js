import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Only allow GET requests for safety
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  try {
    await client.connect();
    const db = client.db('RohaTours');
    
    // Fetch all bookings, sorted by the newest first
    const bookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}