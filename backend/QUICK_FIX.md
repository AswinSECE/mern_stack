# Quick Fix for MongoDB Connection Error

## The Problem
Your `.env` file has:
```
MONGO_URI=your_mongodb_atlas_connection_string_here
```

This is a placeholder and needs to be replaced with a real MongoDB connection string.

## Solution Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Get your connection string from MongoDB Atlas:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Log in to your account
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. **Update your .env file:**
   - Open `backend/.env`
   - Replace the MONGO_URI line with your actual connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/prodmaster?retryWrites=true&w=majority`
   - Make sure to replace `<username>`, `<password>`, and add `/prodmaster` before the `?`

### Option 2: Local MongoDB (For Testing)

If you have MongoDB installed locally:

1. **Update your .env file:**
   ```
   MONGO_URI=mongodb://localhost:27017/prodmaster
   ```

2. **Make sure MongoDB is running:**
   - Windows: Check if MongoDB service is running
   - Or start it manually: `mongod`

### Option 3: Use MongoDB Atlas Free Tier (If you don't have an account)

1. Sign up at: https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster
3. Create a database user
4. Whitelist your IP
5. Get the connection string
6. Update your .env file

See `MONGODB_SETUP.md` for detailed steps.

## After Updating

1. Save the `.env` file
2. The server should automatically restart (nodemon)
3. You should see: `MongoDB Connected: ...`

