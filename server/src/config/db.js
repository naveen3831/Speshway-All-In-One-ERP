import dns from 'node:dns';
import mongoose from 'mongoose';

const DEFAULT_MONGO_URI =
  'mongodb+srv://speshway123:speshway123@speshwyallinoneerp.vv15a6z.mongodb.net/speshway_erp?retryWrites=true&w=majority';

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.includes('<db_password>')) {
    mongoUri = DEFAULT_MONGO_URI;
  }

  const dnsCandidates = [
    process.env.MONGO_DNS_SERVERS?.split(',').map((s) => s.trim()).filter(Boolean) || [],
    ['1.1.1.1', '1.0.0.1'],
    ['8.8.8.8', '8.8.4.4'],
    null, // Default system resolver
  ];

  for (let i = 0; i < dnsCandidates.length; i++) {
    const servers = dnsCandidates[i];
    try {
      if (servers && servers.length) {
        dns.setServers(servers);
      }
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (err) {
      console.warn(`⚠️ DNS/Mongo attempt ${i + 1} (${servers ? servers.join(',') : 'system default'}) failed: ${err.message}`);
    }
  }

  console.warn('ℹ️ Continuing in real-time fallback mode with full persistent product catalog.');
  return false;
};

export default connectDB;
