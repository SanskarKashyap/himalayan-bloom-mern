import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/mern_boilerplate';

let connectionErrorLogged = false;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI ?? DEFAULT_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  mongoose.set('strictQuery', false);
  mongoose.set('bufferCommands', false);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    mongoose.connection.on('error', (error) => {
      if (connectionErrorLogged) {
        return;
      }
      connectionErrorLogged = true;
      console.error('Lost MongoDB connection:', error?.message ?? error);
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    connectionErrorLogged = true;
    console.error('Failed to connect to MongoDB:', error?.message ?? error);
    throw error;
  }
}
