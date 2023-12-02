import { useState } from "react";
import TableRow from "./TableRow";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

function Table({
  users,
  handleUpdateUser,
  setUsers,
  isLoading,
  handleDeleteRow,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  //Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 10;
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const nPage = Math.ceil(users.length / userPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const handleSelectAllRows = () => {
    const allRowIds = currentUsers.map((user) => user.id);
    setSelectedRows(allRowIds);
  };
  const handleSelectRow = (userId) => {
    const newSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(newSelectedRows);
  };

  const handleDeleteSelectedRows = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === currentUsers.length}
                onChange={handleSelectAllRows}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            currentUsers.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                onDelete={handleDeleteRow}
                handleUpdateUser={handleUpdateUser}
                isSelected={selectedRows.includes(user.id)}
                onSelect={handleSelectRow}
              />
            ))
          )}
        </tbody>
      </table>
      <div className="sub-container">
        <div>
          <button
            onClick={handleDeleteSelectedRows}
            className="main-delete"
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <Pagination
          numbers={numbers}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleSelectRowDuringPageChange={setSelectedRows}
        />
      </div>
    </>
  );
}

export default Table;
