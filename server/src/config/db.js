import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('<db_password>')) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      '⚠️ Notice: MONGO_URI in server/.env still contains the placeholder "<db_password>".'
    );
    console.warn(
      '\x1b[36m%s\x1b[0m',
      'ℹ️ Running server with real-time in-memory synchronizer. Replace <db_password> in server/.env with your MongoDB Atlas password to persist to the cloud.'
    );
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.warn('ℹ️ Continuing in real-time fallback mode so servers stay alive.');
  }
};

export default connectDB;
