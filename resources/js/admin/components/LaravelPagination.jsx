const LaravelPagination = ({ children, items, fetchData, setLimit, limit }) => {
  const handlePagination = (e, pageNo) => {
    e.preventDefault();
    fetchData(pageNo);
  };

  const pItems = [];
  let start = 2,
    end = items?.last_page - 1;

  if (items?.last_page > 7) {
    end = 6;
  }

  if (items?.current_page > 4) {
    start = items?.current_page - 3;
    end = items?.current_page + 3;

    if (end > items?.last_page - 1) {
      end = items?.last_page - 1;
      start = end - 6;

      if (start < 2) start = 2;
    }
  }

  if (start > 2) {
    pItems.push(
      <button
        onClick={(e) => e.preventDefault()}
        className="px-2 py-1 text-gray-500 cursor-default"
        key="start-ellipsis"
      >
        &hellip;
      </button>
    );
  }

  for (let pn = start; pn <= end; pn++) {
    pItems.push(
      <button
        onClick={(e) => handlePagination(e, pn)}
        key={pn}
        className={`px-2 py-1 border rounded ${
          pn === items?.current_page
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-600"
        }`}
      >
        {pn}
      </button>
    );
  }

  if (end < items?.last_page - 1) {
    pItems.push(
      <button
        onClick={(e) => e.preventDefault()}
        className="px-2 py-1 text-gray-500 cursor-default"
        key="end-ellipsis"
      >
        &hellip;
      </button>
    );
  }

  if (!items.total) return <div>No records found.</div>;

  return (
    <>
      <div className="flex gap-2 mb-3">
        <select
          name="limit"
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
          id="limit"
          className="p-2 border rounded"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="1">1</option>
        </select>
        <label htmlFor="limit" className="self-center text-gray-600">
          Per Page
        </label>
        <div className="ml-auto text-gray-600">
          <b>
            {items.from} &mdash; {items.to}
          </b>{" "}
          of <b>{items.total}</b> item(s) are showing.
        </div>
      </div>
      {children}
      {items?.last_page > 1 ? (
        <div className="flex justify-center mt-2 space-x-1">
          <button
            onClick={(e) => handlePagination(e, 1)}
            className={`px-2 py-1 border rounded ${
              items?.current_page === 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            1
          </button>

          {pItems}

          <button
            onClick={(e) => handlePagination(e, items.last_page)}
            className={`px-2 py-1 border rounded ${
              items?.current_page === items?.last_page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {items.last_page}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default LaravelPagination;
