import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGO_URI?.replace(/:[^:@]*@/, ':****@'));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connection successful!');
    
    // List databases
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    console.log('Available databases:', dbs.databases.map(db => db.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify username and password are correct');
    console.log('3. Ensure cluster is running');
    process.exit(1);
  }
};

testConnection();