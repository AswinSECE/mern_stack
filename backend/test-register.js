import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const testRegistration = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Test user creation
    const testUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123',
      role: 'staff'
    };

    console.log('Creating test user...');
    const user = await User.create(testUser);
    console.log('✅ User created successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    // Clean up
    await User.deleteOne({ email: 'test@test.com' });
    console.log('✅ Test user cleaned up');

    await mongoose.disconnect();
    console.log('✅ Registration test complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Registration test failed:', error.message);
    process.exit(1);
  }
};

testRegistration();