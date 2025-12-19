import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas
 * Handles connection errors and retries
 */
const connectDB = async () => {
  try {
    // Force Local MongoDB Connection
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/prodmaster');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Ensure your local MongoDB service is running (mongod).');
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;

