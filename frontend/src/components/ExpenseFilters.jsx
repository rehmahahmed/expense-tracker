const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

function ExpenseFilters({ filters, onChange, onClear, onDownload, resultCount }) {
  const handleField = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="filter-field">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search description..."
            value={filters.search}
            onChange={handleField('search')}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="filterCategory">Category</label>
          <select id="filterCategory" value={filters.category} onChange={handleField('category')}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="startDate">From</label>
          <input id="startDate" type="date" value={filters.startDate} onChange={handleField('startDate')} />
        </div>

        <div className="filter-field">
          <label htmlFor="endDate">To</label>
          <input id="endDate" type="date" value={filters.endDate} onChange={handleField('endDate')} />
        </div>
      </div>

      <div className="filters-actions">
        <span className="results-count">{resultCount} result{resultCount === 1 ? '' : 's'}</span>
        <div className="filters-buttons">
          <button type="button" className="btn-secondary" onClick={onClear}>
            Clear Filters
          </button>
          <button type="button" className="btn-primary btn-download" onClick={onDownload}>
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;
