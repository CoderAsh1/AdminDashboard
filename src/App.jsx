import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Components/pagination/Pagination";
import UserTable from "./Components/usertable/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentUsers, setCurrentUsers] = useState([]);
  const [temp, setTemp] = useState([]);
  const [usersPerPage] = useState(10);

  async function fetchData() {
    let result = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setUsers(result.data);
    setTemp(result.data);
  }

  function handleChange(e) {
    setValue(e.target.value);
    if (e.target.value === "") {
      setUsers(temp);
    } else {
      let tempData = temp.filter(
        (user) =>
          user.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        // &&
        // user.role.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
        // user.email.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setUsers(tempData);
    }
  }

  let indexOfLastUser = currentPage * usersPerPage;
  let indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    fetchData();
    // setCurrentUsers(temp);
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="search by name,email or role"
        value={value}
        onChange={handleChange}
        className="textInput"
      />
      <UserTable
        users={users}
        currentUsers={currentUsers}
        setUsers={setUsers}
      />
      <Pagination
        currentUsers={currentUsers}
        users={users}
        usersPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
