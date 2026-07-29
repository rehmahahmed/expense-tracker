import axios from 'axios';

// In dev, Vite proxies /api to http://localhost:5000 (see vite.config.js)
const API_BASE = 'https://expense-tracker-lh2m.onrender.com';

export const getExpenses = () => axios.get(API_BASE);

export const addExpense = (expense) => axios.post(API_BASE, expense);

export const deleteExpense = (id) => axios.delete(`${API_BASE}/${id}`);
