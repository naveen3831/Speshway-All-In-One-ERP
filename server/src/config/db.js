import mongoose from 'mongoose';

const DEFAULT_MONGO_URI =
  'mongodb+srv://speshway123:speshway123@speshwyallinoneerp.vv15a6z.mongodb.net/speshway_erp?retryWrites=true&w=majority';

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('<db_password>')) {
    mongoUri = DEFAULT_MONGO_URI;
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
