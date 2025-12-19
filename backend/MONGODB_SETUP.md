# MongoDB Atlas Setup Guide - Step by Step

## Option 1: Quick Setup (If you already have MongoDB Atlas)

If you already have a MongoDB Atlas account and cluster:

1. **Get your connection string:**
   - Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click on your cluster
   - Click the **"Connect"** button
   - Select **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `prodmaster` (or your preferred database name)

2. **Update your .env file:**
   ```
   MONGO_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/prodmaster?retryWrites=true&w=majority
   ```

3. **Done!** Skip to "Testing the Connection" section below.

---

## Option 2: Complete Setup (New Account)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with:
   - Email address
   - Password
   - Or use Google/GitHub to sign in
3. Complete the registration

### Step 2: Create a Free Cluster

1. After logging in, you'll see "Create a deployment"
2. Choose **"M0 FREE"** (Free Shared Cluster)
3. Select a **Cloud Provider** (AWS, Google Cloud, or Azure)
4. Choose a **Region** closest to you
5. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User

1. While cluster is creating, you'll see a security setup
2. **Create Database User:**
   - Username: Choose a username (e.g., `prodmaster_user`)
   - Password: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT:** Save the username and password! You'll need them.
   - Click **"Create Database User"**

### Step 4: Network Access (Whitelist IP)

1. You'll see "Where would you like to connect from?"
2. For development, click **"Add My Current IP Address"**
3. Or click **"Allow Access from Anywhere"** (uses `0.0.0.0/0`)
   - ⚠️ Only use this for development, not production!
4. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Wait for your cluster to finish creating (green status)
2. Click the **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** as the driver
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

1. Open `backend/.env` file
2. Replace the connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name before `?` (e.g., `/prodmaster?`)
   
   **Example:**
   ```
   MONGO_URI=mongodb+srv://prodmaster_user:MyPassword123@cluster0.xxxxx.mongodb.net/prodmaster?retryWrites=true&w=majority
   ```

### Step 7: Testing the Connection

1. Make sure you're in the `backend` directory
2. Install dependencies (if not done):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net:27017
   Server running in development mode on port 5000
   ```

If you see connection errors, check:
- ✅ Username and password are correct
- ✅ Your IP is whitelisted in Network Access
- ✅ Database name is correct
- ✅ No extra spaces in the connection string

---

## Common Issues & Solutions

### Issue: "Authentication failed"
**Solution:** Double-check your username and password in the connection string

### Issue: "IP not whitelisted"
**Solution:** Go to Network Access in MongoDB Atlas and add your current IP

### Issue: "Connection timeout"
**Solution:** 
- Check your internet connection
- Verify the cluster is running (green status)
- Try using `0.0.0.0/0` for development (less secure but works)

### Issue: "Invalid connection string"
**Solution:**
- Make sure there are no spaces
- Make sure special characters in password are URL-encoded
- Format: `mongodb+srv://username:password@cluster/database?options`

---

## Security Best Practices

✅ **Do:**
- Use strong passwords
- Whitelist specific IPs for production
- Keep your `.env` file secret (never commit to Git)
- Use different users for different applications

❌ **Don't:**
- Share your connection string publicly
- Use `0.0.0.0/0` in production
- Commit `.env` to version control
- Use weak passwords

---

## Need Help?

If you're stuck:
1. Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
2. Verify your connection string format
3. Check MongoDB Atlas dashboard for any error messages
4. Make sure your cluster status is "Active" (green)

