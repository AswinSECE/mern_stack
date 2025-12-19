# Database Setup Guide

## MongoDB Atlas Setup

### 1. Fix IP Whitelist Issue
- Go to MongoDB Atlas Dashboard
- Navigate to Network Access
- Add your current IP address or use `0.0.0.0/0` for all IPs (development only)

### 2. Verify Database User
- Go to Database Access
- Ensure user `aswin_db` exists with password `aswin123`
- Grant `readWrite` permissions to `aswin_db` database

### 3. Test Connection
```bash
cd backend
npm run test-db
```

### 4. Initialize Database
```bash
npm run init-db
```

### 5. Start Server
```bash
npm run dev
```

## Troubleshooting

### Connection Issues
1. **IP Whitelist**: Add your IP in MongoDB Atlas Network Access
2. **Credentials**: Verify username/password in Atlas Database Access
3. **Cluster Status**: Ensure cluster is running (not paused)

### Registration Issues
1. Run connection test: `npm run test-db`
2. Check server logs for detailed error messages
3. Verify all required fields are provided

## Test Registration
Use these credentials to test:
- **Admin**: admin@admin.com / admin123
- **API Endpoint**: POST /api/auth/register

### Sample Registration Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "role": "staff"
}
```