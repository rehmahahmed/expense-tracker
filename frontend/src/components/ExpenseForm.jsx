import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.amount || Number(form.amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!form.description.trim()) {
      setError('Please enter a description.');
      return;
    }

    try {
      await onAdd({
        ...form,
        amount: parseFloat(form.amount),
      });
      // reset form
      setForm({
        amount: '',
        description: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().slice(0, 10),
      });
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="e.g. Grocery shopping"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
      </div>

      <button type="submit" className="btn-primary">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
