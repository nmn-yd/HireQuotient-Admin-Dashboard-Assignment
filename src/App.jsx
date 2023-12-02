import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Table from "./Components/Table";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const userdetails = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await userdetails.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  function handleUpdateUser(userId, updatedUserData) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      )
    );
  }

  function handleDeleteRow(userId) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="wrapper">
      <Header setSearchTerm={setSearchTerm} />
      <Table
        key={filteredUsers.length}
        users={filteredUsers}
        setUsers={setUsers}
        isLoading={isLoading}
        handleDeleteRow={handleDeleteRow}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default App;
