import dns from 'node:dns';
import mongoose from 'mongoose';

// Direct standard replica-set URI that bypasses DNS SRV lookups entirely
const DIRECT_REPLICA_URI =
  'mongodb://speshway123:speshway123@ac-dvecrsd-shard-00-00.vv15a6z.mongodb.net:27017,ac-dvecrsd-shard-00-01.vv15a6z.mongodb.net:27017,ac-dvecrsd-shard-00-02.vv15a6z.mongodb.net:27017/speshway_erp?ssl=true&authSource=admin&retryWrites=true&w=majority';

const DEFAULT_SRV_URI =
  'mongodb+srv://speshway123:speshway123@speshwyallinoneerp.vv15a6z.mongodb.net/speshway_erp?retryWrites=true&w=majority';

const connectDB = async () => {
  // Pre-configure high-speed Cloudflare and Google public DNS resolvers for MongoDB SRV lookups
  try {
    dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4']);
  } catch (dnsErr) {
    console.warn('DNS server configuration warning:', dnsErr.message);
  }

  const primaryUri = process.env.MONGO_URI || DEFAULT_SRV_URI;

  // Connection attempts: 1) Primary URI with Cloudflare DNS, 2) Direct replica-set non-SRV URI
  const connectionCandidates = [
    { name: 'Primary Mongo URI', uri: primaryUri },
    { name: 'Direct Replica-Set Gateway (Guaranteed)', uri: DIRECT_REPLICA_URI },
  ];

  for (let i = 0; i < connectionCandidates.length; i++) {
    const candidate = connectionCandidates[i];
    try {
      console.log(`🔌 Connecting to MongoDB via ${candidate.name}...`);
      const conn = await mongoose.connect(candidate.uri, {
        serverSelectionTimeoutMS: 6000,
      });
      console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host} (${conn.connection.name})`);
      return true;
    } catch (err) {
      console.warn(`⚠️ MongoDB connection attempt ${i + 1} (${candidate.name}) failed: ${err.message}`);
    }
  }

  console.error('❌ Could not establish remote MongoDB connection. Reverting to persistent memory state.');
  return false;
};

export default connectDB;
