# Personal Expense Tracker (MERN)

A simple full-stack expense tracker built with MongoDB, Express, React (Vite), and Node.js.

## Features
- Add an expense (amount, description, category, date)
- View all expenses (sorted by newest date)
- See total amount spent
- Delete an expense

## Project Structure
```
expense-tracker/
├── backend/
│   ├── models/Expense.js
│   ├── routes/expenses.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseList.jsx
    │   │   └── ExpenseItem.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── api.js
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI is different
npm run dev      # starts on http://localhost:5000 (uses nodemon)
# or: npm start
```

The API exposes:
| Method | Endpoint            | Description         |
|--------|----------------------|----------------------|
| POST   | /api/expenses         | Add a new expense   |
| GET    | /api/expenses         | Get all expenses    |
| DELETE | /api/expenses/:id     | Delete an expense   |

Example POST body:
```json
{
  "amount": 250,
  "description": "Grocery shopping",
  "category": "Food",
  "date": "2026-07-28"
}
```

## 2. Frontend Setup
Open a second terminal:
```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:3000
```

The Vite dev server proxies any request to `/api/*` to `http://localhost:5000` (see `vite.config.js`), so the frontend and backend can run independently in development.

Open **http://localhost:3000** in your browser.

## 3. Production Build (optional)
```bash
cd frontend
npm run build      # outputs static files to frontend/dist
```
Serve the `dist` folder with any static host, or add `express.static` in `server.js` to serve it directly from the backend.

## Notes
- MongoDB schema validation ensures amount, description, category, and date are required.
- Currency symbol (₹) is used in the UI — change it in `ExpenseItem.jsx` and `App.jsx` if you prefer a different currency.
- CORS is enabled on the backend so the frontend (different port) can call the API during development.
