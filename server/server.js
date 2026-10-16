import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Pearl Guide API',
    version: '1.0.0',
    phase: 'Phase 1 - Frontend Architecture & UI Complete',
    timestamp: new Date().toISOString()
  });
});

// Sample destinations endpoint (for Phase 2 API integration)
app.get('/api/destinations', (req, res) => {
  res.json({
    message: 'Destination endpoints will be connected to MongoDB Atlas in Phase 2.',
    status: 'ready'
  });
});

// Fallback route
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Pearl Guide Server running on port ${PORT}`);
});
