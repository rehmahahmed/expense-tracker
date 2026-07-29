// Converts an array of expense objects into a downloadable CSV file
// and triggers the browser download.
export function downloadExpensesAsCSV(expenses, filename = 'expenses.csv') {
  if (!expenses || expenses.length === 0) {
    return;
  }

  const headers = ['Description', 'Category', 'Amount', 'Date'];

  const escapeCell = (value) => {
    const str = String(value ?? '');
    // Wrap in quotes and escape internal quotes if the value contains
    // a comma, quote, or newline.
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = expenses.map((exp) => [
    escapeCell(exp.description),
    escapeCell(exp.category),
    escapeCell(exp.amount.toFixed(2)),
    escapeCell(new Date(exp.date).toISOString().slice(0, 10)),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
