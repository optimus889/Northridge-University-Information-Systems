# Northridge University Zero Trust Portal

A full-stack university portal built with **React + Vite** (Frontend) and **Express + MongoDB** (Backend), featuring role-based access for students, faculty, and administrators, with optional AWS service integration (S3, SES).

---

## Project Structure

```
Northridge University/
├── .env.example                        # Root-level environment variable template
└── Northridge University Demo/
    ├── Northridge University Frontend/ # React + Vite frontend
    │   ├── src/
    │   │   ├── pages/                  # Student / Faculty / Admin pages
    │   │   ├── components/             # Shared UI components
    │   │   ├── api/                    # API request layer
    │   │   ├── auth/                   # Auth context & route guards
    │   │   ├── aws/                    # AWS Cognito / S3 adapters
    │   │   └── routes/                 # React Router configuration
    │   ├── package.json
    │   └── .env
    └── Northridge University Backend/  # Express + MongoDB backend
        ├── src/
        │   ├── controllers/            # Business logic controllers
        │   ├── models/                 # Mongoose data models
        │   ├── routes/                 # API routes
        │   ├── middleware/             # JWT auth & error handling middleware
        │   ├── services/               # AWS S3 / SES service wrappers
        │   ├── scripts/                # Database seed & verification scripts
        │   └── server.js               # Server entry point
        ├── package.json
        └── .env
```

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18+ |
| npm | 9+ |
| MongoDB | 6+ (local or Atlas) |

---

## Getting Started

### 1. Extract the Project

```bash
unzip Northridge_University.zip
cd "Northridge University/Northridge University Demo"
```

---

### 2. Start MongoDB

Make sure a local MongoDB instance is running on the default port `27017`:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Or run directly in the foreground
mongod --dbpath /usr/local/var/mongodb
```

---

### 3. Set Up and Start the Backend

```bash
cd "Northridge University Backend"
```

**Install dependencies:**

```bash
npm install
```

**Configure environment variables:**

The `.env` file ships with sensible development defaults and works out of the box. Edit it if you need to customize:

```env
PORT=3000
NODE_ENV=development

# MongoDB connection string (local default)
MONGODB_URI=mongodb://127.0.0.1:27017/northridge_zero_trust

# JWT signing secret (replace with a strong random string in production)
JWT_SECRET=northridge-demo-secret
JWT_EXPIRES_IN=1d

# Allowed CORS origin for the frontend
FRONTEND_ORIGIN=http://localhost:5173

# AWS integration (set to false for demo mode — no real AWS account needed)
AWS_ENABLE_REAL_SERVICES=false
AWS_REGION=us-east-1
AWS_S3_BUCKET=
AWS_SES_FROM_EMAIL=
```

**Seed the database (required on first run):**

```bash
npm run seed
```

**Start the backend development server (with hot reload):**

```bash
npm run dev
```

Once the backend is running, you should see:

```
Northridge backend running on http://localhost:3000
```

> To start in production mode, use `npm start` instead.

---

### 4. Set Up and Start the Frontend

Open a new terminal window:

```bash
cd "Northridge University Frontend"
```

**Install dependencies:**

```bash
npm install
```

**Configure environment variables:**

The `.env` file is pre-configured to match the default backend port — no changes needed:

```env
# Set to true to use local mock data instead of calling the backend
VITE_USE_MOCKS=false

# Backend API base URL
VITE_API_BASE_URL=http://localhost:3000/api
```

> If you want to run the frontend UI **without starting the backend**, set `VITE_USE_MOCKS=true`. The frontend will use built-in mock data and run standalone.

**Start the frontend development server:**

```bash
npm run dev
```

Once running, you should see:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser to access the portal.

---

## Full Startup Summary

```bash
# Terminal 1 — Start MongoDB
brew services start mongodb-community   # macOS

# Terminal 2 — Backend
cd "Northridge University Backend"
npm install
npm run seed      # First run only
npm run dev

# Terminal 3 — Frontend
cd "Northridge University Frontend"
npm install
npm run dev
```

---

## Available npm Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start in development mode (nodemon hot reload) |
| `npm start` | Start in production mode |
| `npm run seed` | Seed the database with initial data |
| `npm run verify` | Verify API endpoint availability |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start in development mode (Vite HMR) |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## AWS Integration (Optional)

The project includes built-in adapters for AWS S3 (file storage) and SES (email delivery), both disabled by default (`AWS_ENABLE_REAL_SERVICES=false`). To enable real AWS services, populate the following fields in the backend `.env` and ensure the associated IAM role has `s3:*` and `ses:SendEmail` permissions:

```env
AWS_ENABLE_REAL_SERVICES=true
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
AWS_SES_FROM_EMAIL=noreply@yourdomain.com
```

The frontend `.env` also reserves fields for a future AWS Cognito integration:

```env
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=
VITE_COGNITO_CLIENT_ID=
```

---

## Troubleshooting

**Q: Backend throws `MongooseServerSelectionError`?**  
A: MongoDB is not running. Start it with `brew services start mongodb-community` (macOS) or `sudo systemctl start mongod` (Linux).

**Q: Frontend shows a blank page or returns 404 errors?**  
A: Verify that `VITE_API_BASE_URL` in the frontend `.env` matches the backend port (default: `3000`).

**Q: The seed script fails with `Cannot find module`?**  
A: Make sure you have run `npm install` and that your current directory is `Northridge University Backend/`.

**Q: Just want to view the UI without setting up a database?**  
A: Set `VITE_USE_MOCKS=true` in the frontend `.env` and start only the frontend.