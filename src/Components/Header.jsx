import { useRef } from "react";
import { useKey } from "../HelperFunction/useKey";
function Header({ setSearchTerm }) {
  const inputEl = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });
  return (
    <header className="header">
      <img alt="Dashboard Icon" src="logo.png" />
      <div className="sub-header">
        <input
          type="text"
          className="search-icon"
          placeholder="Search User"
          ref={inputEl}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          className="users-icon"
          alt="Group of users"
          src="../../public/users.png"
        />
      </div>
    </header>
  );
}

export default Header;
