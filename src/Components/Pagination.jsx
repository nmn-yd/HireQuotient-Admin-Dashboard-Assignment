function Pagination({
  numbers,
  handleSelectRowDuringPageChange,
  currentPage,
  onPageChange,
}) {
  function setPageToStart() {
    if (currentPage !== 1) {
      handleSelectRowDuringPageChange([]);
      onPageChange(1);
    }
  }

  function setPageto(pageNumber) {
    if (pageNumber != currentPage) {
      onPageChange(pageNumber);
      handleSelectRowDuringPageChange([]);
    }
  }

  function nextPage() {
    if (currentPage !== numbers.length) {
      onPageChange(currentPage + 1);
      handleSelectRowDuringPageChange([]);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
      handleSelectRowDuringPageChange([]);
    }
  }

  function setPageToEnd() {
    if (currentPage !== numbers.length) {
      onPageChange(numbers.length);
      handleSelectRowDuringPageChange([]);
    }
  }

  return (
    <div className="pagination-block">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button onClick={setPageToStart} className="page-link page=start">
              {"<<"}
            </button>
          </li>
          <li className="page-item ">
            {currentPage === 1 ? null : (
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="page-link page-prev"
              >
                {"<"}
              </button>
            )}
          </li>
          {numbers.map((num, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === num ? "active" : ""}`}
            >
              <button onClick={() => setPageto(num)} className="page-link">
                {num}
              </button>
            </li>
          ))}
          <li className="page-item">
            {currentPage === numbers.length ? (
              ""
            ) : (
              <button onClick={nextPage} className="page-link page-next">
                {">"}
              </button>
            )}
          </li>
          <li className="page-item">
            {currentPage === numbers.length ? null : (
              <button
                onClick={setPageToEnd}
                disabled={currentPage === numbers.length}
                className="page-link page-end"
              >
                {">>"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
