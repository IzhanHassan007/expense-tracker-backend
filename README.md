# Expense Tracker Backend

Node.js + Express + MongoDB backend for the Expense Tracker app.

## Requirements
- Node.js 18+
- MongoDB Atlas connection string

## Setup (Windows PowerShell)

1) Install dependencies
```
npm install
```

2) Create `.env` from the template
```
Copy-Item -Path .\env.example -Destination .\.env
# Now open .env and fill MONGODB_URI and JWT_SECRET
```

3) Seed default categories (run once)
```
npm run seed:categories
```

4) Start the dev server
```
npm run dev
```

Health check:
```
GET http://localhost:8080/health -> { "status": "ok" }
```

## Scripts
- `npm run dev` — start with nodemon
- `npm start` — start server
- `npm run seed:categories` — seed default categories into DB

## API (high level)
- `POST /api/auth/signup` — { name, email, password }
- `POST /api/auth/login` — { email, password }
- `POST /api/expenses` — protected
- `GET /api/expenses` — protected (filters, pagination)
- `PUT /api/expenses/:id` — protected
- `DELETE /api/expenses/:id` — protected
- `GET /api/categories` — protected
- `POST /api/categories` — protected






