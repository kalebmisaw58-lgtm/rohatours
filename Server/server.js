import express from 'express';
import cors from 'cors';
import { connectDB, getDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// POST /api/bookings
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = {
      ...req.body,
      status: "pending",
      createdAt: new Date()
    };

    const db = getDB();
    const result = await db.collection("bookings").insertOne(booking);

    res.status(201).json({
      success: true,
      message: "Booking request received successfully!",
      bookingId: result.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/bookings (for staff dashboard)
app.get('/api/bookings', async (req, res) => {
  try {
    const db = getDB();
    const bookings = await db.collection("bookings")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 RohaTours server running on http://localhost:${PORT}`);
});