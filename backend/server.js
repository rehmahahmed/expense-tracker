require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_tracker';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

// Connect to MongoDB, then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
