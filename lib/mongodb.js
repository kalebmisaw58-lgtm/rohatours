import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        try { 
            await cachedClient.db('admin').command({ ping: 1 }); 
        } catch { 
            cachedClient = null; 
            cachedDb = null; 
        }
    }
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
    if (!uri) throw new Error('MONGODB_URI environment variable is not defined');
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db('RohaTours');
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

