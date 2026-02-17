import { MongoClient } from 'mongodb'; // Changed from require

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    await client.connect();
    const db = client.db('RohaTours'); 
    const result = await db.collection('bookings').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}