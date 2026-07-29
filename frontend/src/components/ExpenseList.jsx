import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add one above to get started.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ExpenseList;
