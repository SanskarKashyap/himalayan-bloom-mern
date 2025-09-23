import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
import { connectToDatabase } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
