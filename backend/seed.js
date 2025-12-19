import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
    {
        name: 'Wireless Ergonomic Mouse',
        category: 'Electronics',
        price: 49.99,
        quantity: 150,
        minStock: 20,
        sku: 'MX-ERGO-001',
        description: 'Advanced ergonomic mouse for comfortable all-day use.',
    },
    {
        name: 'Mechanical Gaming Keyboard',
        category: 'Electronics',
        price: 129.99,
        quantity: 45,
        minStock: 10,
        sku: 'KEY-MECH-RGB',
        description: 'RGB backlit mechanical keyboard with tactile blue switches.',
    },
    {
        name: '4K Ultra HD Monitor',
        category: 'Electronics',
        price: 399.99,
        quantity: 8,
        minStock: 5,
        sku: 'MON-4K-27',
        description: '27-inch 4K monitor with HDR support and 144Hz refresh rate.',
    },
    {
        name: 'Noise Cancelling Headphones',
        category: 'Audio',
        price: 249.99,
        quantity: 30,
        minStock: 10,
        sku: 'AUD-NC-PRO',
        description: 'Premium wireless headphones with active noise cancellation.',
    },
    {
        name: 'USB-C Docking Station',
        category: 'Accessories',
        price: 89.99,
        quantity: 75,
        minStock: 15,
        sku: 'DOCK-USBC-HUB',
        description: '10-in-1 USB-C hub with HDMI, Ethernet, and PD charging.',
    },
    {
        name: 'Smart Home Security Camera',
        category: 'Smart Home',
        price: 79.99,
        quantity: 12,
        minStock: 10,
        sku: 'CAM-WIFI-1080',
        description: '1080p Wi-Fi camera with night vision and motion detection.',
    },
    {
        name: 'Ergonomic Office Chair',
        category: 'Furniture',
        price: 299.99,
        quantity: 5,
        minStock: 3,
        sku: 'CHR-ERGO-MESH',
        description: 'Breathable mesh office chair with adjustable lumbar support.',
    },
    {
        name: 'Stainless Steel Water Bottle',
        category: 'Lifestyle',
        price: 24.99,
        quantity: 200,
        minStock: 30,
        sku: 'BOT-SS-500',
        description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    },
    {
        name: 'Bluetooth Portable Speaker',
        category: 'Audio',
        price: 59.99,
        quantity: 60,
        minStock: 15,
        sku: 'SPK-BT-MINI',
        description: 'Waterproof portable speaker with 12-hour battery life.',
    },
    {
        name: 'Laptop Backpack',
        category: 'Accessories',
        price: 45.99,
        quantity: 100,
        minStock: 25,
        sku: 'BAG-LAP-15',
        description: 'Water-resistant backpack with dedicated laptop compartment.',
    },
];

const seedData = async () => {
    try {
        // Force local connection if not set
        if (!process.env.MONGO_URI) {
            await mongoose.connect('mongodb://127.0.0.1:27017/prodmaster');
        } else {
            await connectDB();
        }

        console.log('MongoDB Connected for Seeding');

        // Find or create a user
        let user = await User.findOne();
        if (!user) {
            user = await User.create({
                name: 'Admin User',
                email: 'admin@prodmaster.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('Created default admin user');
        }

        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared');

        // Assign user to products
        const productsWithUser = products.map(p => ({ ...p, createdBy: user._id }));

        // Insert new products
        await Product.insertMany(productsWithUser);
        console.log('Sample products added successfully');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
