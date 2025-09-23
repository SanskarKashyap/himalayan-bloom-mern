import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/mern_boilerplate';

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI ?? DEFAULT_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('Connected to MongoDB');
}
