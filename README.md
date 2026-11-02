# Speshway All-In-One ERP (MERN Stack)

A scalable, full-featured Enterprise Resource Planning (ERP) platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 📁 Project Structure

```text
Speshway-All-In-One-ERP/
├── client/                     # Frontend (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, static files
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Header, Sidebar, Card, Buttons, etc.
│   │   │   └── layout/         # DashboardLayout, AuthLayout
│   │   ├── context/            # React Context (AuthContext, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Views (Dashboard, Login, HR, Inventory...)
│   │   ├── services/           # Axios API client & endpoints
│   │   ├── utils/              # Client-side helper functions & constants
│   │   ├── App.jsx             # React routing & app entry component
│   │   ├── index.css           # Global CSS variables & reset
│   │   └── main.jsx            # React DOM mounting
│   ├── .env.example            # Client environment sample
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies & scripts
│   └── vite.config.js          # Vite config & API reverse proxy
│
├── server/                     # Backend API (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # DB & cloud configurations (db.js)
│   │   ├── controllers/        # Request handling logic (authController, etc.)
│   │   ├── middleware/         # Auth & error handling middlewares
│   │   ├── models/             # Mongoose schemas (User.js, etc.)
│   │   ├── routes/             # Express API routes (authRoutes, userRoutes)
│   │   ├── services/           # Reusable business logic layer
│   │   ├── utils/              # Helper utilities (generateToken.js)
│   │   ├── app.js              # Express app initialization & middleware
│   │   └── server.js           # Server entry point & DB connection listener
│   ├── .env.example            # Backend environment sample
│   └── package.json            # Backend dependencies & scripts
│
├── .gitignore                  # Git ignore rules for node_modules, .env, build output
├── package.json                # Root package orchestrating both client & server
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas URI)

### 2. Environment Configuration

#### Backend (`server/.env`):
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/speshway_erp
# Optional, if your DNS resolver blocks MongoDB Atlas SRV lookups:
# MONGO_DNS_SERVERS=1.1.1.1,1.0.0.1
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```
For MongoDB Atlas, use the connection string provided by your Atlas cluster and replace its password placeholder. If Node.js reports `querySrv ECONNREFUSED` while SRV lookups work in your system tools, set `MONGO_DNS_SERVERS` to DNS resolvers reachable from your machine. The API can start in in-memory fallback mode while MongoDB is unavailable, but database-backed changes will not persist.

#### Frontend (`client/.env`):
Create `client/.env` based on `client/.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Installation

You can install all dependencies across root, server, and client with one command from the project root:

```bash
npm run install:all
```

Or install separately:
```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

---

### 4. Running the Application

#### Run both Client and Server concurrently (from root):
```bash
npm run dev
```

#### Or run independently:

- **Backend** (running on `http://localhost:5000`):
  ```bash
  cd server
  npm run dev
  ```

- **Frontend** (running on `http://localhost:5173`):
  ```bash
  cd client
  npm run dev
  ```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Health status check | Public |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | User login & token issue | Public |
| `GET` | `/api/auth/me` | Current user profile | Private |
| `GET` | `/api/users` | List all users | Admin / Manager |
| `GET` | `/api/users/:id` | Get user by ID | Admin / Manager |
| `PUT` | `/api/users/:id` | Update user details | Admin |
| `DELETE` | `/api/users/:id` | Delete user | Admin |
