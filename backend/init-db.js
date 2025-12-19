import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create collections if they don't exist
    console.log('Creating collections...');
    
    // Create users collection
    await User.createCollection();
    console.log('✅ Users collection created');

    // Create products collection  
    await Product.createCollection();
    console.log('✅ Products collection created');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created (admin@admin.com / admin123)');
    }

    console.log('✅ Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

initializeDatabase();