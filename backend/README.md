# ProdMaster Backend API

Backend API for ProdMaster - A Product/Inventory Management System built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (MongoDB)
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
 ├── config/
 │   └── db.js              # MongoDB connection
 ├── controllers/
 │   ├── authController.js  # Authentication logic
 │   ├── userController.js  # User operations
 │   └── productController.js # Product CRUD operations
 ├── middleware/
 │   ├── auth.js            # JWT authentication & authorization
 │   └── errorHandler.js    # Centralized error handling
 ├── models/
 │   ├── User.js            # User schema
 │   └── Product.js         # Product schema
 ├── routes/
 │   ├── authRoutes.js      # Auth endpoints
 │   ├── userRoutes.js      # User endpoints
 │   └── productRoutes.js   # Product endpoints
 ├── server.js              # Express app entry point
 ├── .env.example           # Environment variables template
 └── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
```

**Important Notes:**
- **MONGO_URI**: Get your MongoDB Atlas connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **JWT_SECRET**: Generate a strong random string (minimum 32 characters)
  - You can generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` (or the PORT specified in .env)

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"  // Optional: "admin" or "staff" (default: "staff")
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

### User Endpoints

#### Get User Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Product Endpoints

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Laptop",
  "category": "Electronics",
  "price": 899.99,
  "quantity": 15,
  "description": "High-performance laptop"
}
```

#### Get All Products (Protected)
```http
GET /api/products
Authorization: Bearer <token>
```

#### Get Single Product (Protected)
```http
GET /api/products/:id
Authorization: Bearer <token>
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 999.99,
  "quantity": 20
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

## Postman Collection Examples

### 1. Register Admin User
```json
POST http://localhost:5000/api/auth/register
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Admin User",
  "email": "admin@prodmaster.com",
  "password": "admin123",
  "role": "admin"
}
```

### 2. Login
```json
POST http://localhost:5000/api/auth/login
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "email": "admin@prodmaster.com",
  "password": "admin123"
}
```

### 3. Create Product (Use token from login)
```json
POST http://localhost:5000/api/products
Headers:
  Content-Type: application/json
  Authorization: Bearer <your_token_here>
Body (raw JSON):
{
  "name": "Wireless Mouse",
  "category": "Accessories",
  "price": 29.99,
  "quantity": 50,
  "description": "Ergonomic wireless mouse"
}
```

### 4. Get All Products
```json
GET http://localhost:5000/api/products
Headers:
  Authorization: Bearer <your_token_here>
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens expire after **1 day**.

## Authorization

- **All authenticated users** can view products
- **Only admin users** can create, update, or delete products

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Connecting Frontend

The backend is configured to accept requests from `http://localhost:5173` (Vite default port).

### Example Axios Setup

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## Security Notes

- Passwords are hashed using bcryptjs before storage
- JWT tokens are required for protected routes
- Admin-only routes are protected by role-based authorization
- CORS is configured for the frontend origin
- Environment variables are used for sensitive data

## Development

- Use `npm run dev` for development (auto-restart with nodemon)
- Use `npm start` for production

## License

ISC

