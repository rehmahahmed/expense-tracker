function ExpenseItem({ expense, onDelete }) {
  const formattedDate = new Date(expense.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-description">{expense.description}</span>
        <span className="expense-meta">
          {expense.category} &middot; {formattedDate}
        </span>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
        <button className="btn-delete" onClick={() => onDelete(expense._id)} aria-label="Delete expense">
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
