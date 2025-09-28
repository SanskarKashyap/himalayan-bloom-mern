import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
import { connectToDatabase } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed. Please verify your MONGODB_URI and network access.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

startServer();

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
