import { MongoClient } from 'mongodb';

// We pull the client outside the handler to keep the connection "warm" 
// for faster performance on the next click.
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // You don't necessarily need to call connect() every single time 
    // if you define the client outside, but it's safe to keep for now.
    await client.connect();
    const db = client.db('RohaTours'); 
    
    // Insert the data
    const result = await db.collection('bookings').insertOne({
      ...req.body,
      createdAt: new Date() // Better to set the date on the server side
    });

    // Explicitly send a success JSON back to the index.html
    return res.status(201).json({ success: true, id: result.insertedId });

  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: error.message });
  } 
  // Notice we removed client.close() - Vercel handles the cleanup, 
  // and keeping it open makes the next booking faster!
}