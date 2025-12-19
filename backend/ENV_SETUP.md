# Environment Variables Setup Guide

## Step 1: Create the .env File

In the `backend` directory, create a new file named `.env` (no extension, just `.env`)

## Step 2: Add the Required Variables

Copy and paste the following into your `.env` file, then replace the placeholder values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGO_URI=your_mongodb_atlas_connection_string_here

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
```

## Step 3: Get Your MongoDB Atlas Connection String

### Option A: If you already have MongoDB Atlas account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. Click on **"Connect"** button for your cluster
4. Choose **"Connect your application"**
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with your database name (e.g., `prodmaster`)

**Example format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/prodmaster?retryWrites=true&w=majority
```

### Option B: If you need to create a MongoDB Atlas account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Save the username and password
5. Whitelist your IP:
   - Go to **Network Access** → **Add IP Address**
   - Click **"Add Current IP Address"** or use `0.0.0.0/0` for development (not recommended for production)
6. Get connection string:
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` and `<dbname>` as mentioned above

## Step 4: Generate JWT Secret

You need a strong random string for JWT_SECRET (minimum 32 characters).

### Method 1: Using Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This will output a 64-character hexadecimal string. Copy it and use it as your JWT_SECRET.

### Method 2: Using Online Generator
- Visit: https://randomkeygen.com/
- Use a "CodeIgniter Encryption Keys" or generate a random string
- Make sure it's at least 32 characters long

### Method 3: Manual (for development only)
For development/testing, you can use a simple string, but **NEVER use this in production**:
```
JWT_SECRET=my_dev_secret_key_change_this_in_production_12345
```

## Step 5: Final .env File Example

After filling in all values, your `.env` file should look like this:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/prodmaster?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

## Important Notes

⚠️ **Security Warnings:**
- **NEVER** commit your `.env` file to Git (it's already in `.gitignore`)
- **NEVER** share your `.env` file or its contents
- Use strong, unique passwords for MongoDB
- Use a strong, random JWT_SECRET (especially in production)

✅ **Verification:**
- Make sure there are **no spaces** around the `=` sign
- Make sure there are **no quotes** around the values (unless the value itself contains spaces)
- Make sure the file is named exactly `.env` (not `.env.txt` or `env`)

## Quick Setup Commands

### Windows (PowerShell):
```powershell
cd backend
# Create .env file
New-Item -Path .env -ItemType File
# Then open it in your editor and add the content
```

### Mac/Linux:
```bash
cd backend
# Create .env file
touch .env
# Then open it in your editor and add the content
```

## Testing Your Setup

After creating your `.env` file:

1. Make sure you're in the `backend` directory
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. You should see: `MongoDB Connected: ...` and `Server running...`

If you see connection errors, double-check your MONGO_URI and make sure:
- Your MongoDB password is correct
- Your IP is whitelisted in MongoDB Atlas
- Your cluster is running

