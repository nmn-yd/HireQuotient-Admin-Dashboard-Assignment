import { useEffect, useState } from "react";

const TableRow = ({
  user,
  handleUpdateUser,
  onSelect,
  isSelected,
  onDelete,
}) => {
  const {
    id,
    name: originalName,
    email: originalEmail,
    role: originalRole,
  } = user;
  const [isChecked, setIsChecked] = useState(isSelected);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(originalName);
  const [email, setEmail] = useState(originalEmail);
  const [role, setRole] = useState(originalRole);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleUpdateUser(id, { name, email, role });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(originalName);
    setEmail(originalEmail);
    setRole(originalRole);
  };

  function handleSelectToggle() {
    setIsChecked(!isChecked);
    onSelect(id);
  }

  return (
    <tr className={isChecked ? "ischecked" : ""}>
      <td data-cell="Select Row">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleSelectToggle}
        />
      </td>
      <td data-cell="name">
        {isEditing ? (
          <input
            className="input-text-edit"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          name
        )}
      </td>
      <td data-cell="email">
        {isEditing ? (
          <input
            type="text"
            className="input-text-edit"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          email
        )}
      </td>
      <td data-cell="role">
        {isEditing ? (
          <input
            type="text"
            className="input-text-edit"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        ) : (
          role
        )}
      </td>
      <td data-cell="action">
        <div>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className="save">
                <img alt="Delete icon" src="../../public/correct.png" />
              </button>
              <button onClick={handleCancelClick} className="cancel">
                <img alt="Delete icon" src="../../public/remove.png" />
              </button>
            </>
          ) : (
            <>
              <button
                disabled={isChecked}
                onClick={() => onDelete(id)}
                className="delete"
              >
                <img alt="Delete icon" src="../../public/delete.png" />
              </button>
              <button
                disabled={isChecked}
                onClick={handleEditClick}
                className="edit"
              >
                <img alt="Delete icon" src="../../public/edit.png" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
