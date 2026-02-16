const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('RohaTours');
      const bookings = database.collection('bookings');
      const result = await bookings.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}