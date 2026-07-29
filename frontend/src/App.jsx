import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilters from './components/ExpenseFilters';
import { getExpenses, addExpense, deleteExpense } from './api';
import { downloadExpensesAsCSV } from './utils/csv';

const DEFAULT_FILTERS = {
  search: '',
  category: 'All',
  startDate: '',
  endDate: '',
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data);
      setError('');
    } catch (err) {
      setError('Could not load expenses. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (expense) => {
    const res = await addExpense(expense);
    setExpenses((prev) => [res.data, ...prev]);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      // Search by description (case-insensitive)
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        if (!exp.description.toLowerCase().includes(q)) return false;
      }

      // Category filter
      if (filters.category !== 'All' && exp.category !== filters.category) {
        return false;
      }

      // Date range filter (inclusive)
      const expDate = new Date(exp.date).toISOString().slice(0, 10);
      if (filters.startDate && expDate < filters.startDate) return false;
      if (filters.endDate && expDate > filters.endDate) return false;

      return true;
    });
  }, [expenses, filters]);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleClearFilters = () => setFilters(DEFAULT_FILTERS);

  const handleDownload = () => {
    downloadExpensesAsCSV(filteredExpenses, 'expenses.csv');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Expense Tracker</h1>
      </header>

      <main className="app-main">
        <section className="left-panel">
          <ExpenseForm onAdd={handleAdd} />
        </section>

        <section className="right-panel">
          <div className="total-card">
            <span>Total Spent</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>

          <ExpenseFilters
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
            onDownload={handleDownload}
            resultCount={filteredExpenses.length}
          />

          {error && <p className="form-error">{error}</p>}
          {loading ? (
            <p>Loading expenses...</p>
          ) : (
            <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
