import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Components/pagination/Pagination";
import UserTable from "./Components/usertable/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  async function fetchData() {
    let result = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    // result.data.map((data) => (data.isChecked = false));
    setUsers(result.data);
    console.log(result.data);
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="textInput"
      />
      <UserTable users={users} setUsers={setUsers} />
      <Pagination />
    </div>
  );
}

export default App;
