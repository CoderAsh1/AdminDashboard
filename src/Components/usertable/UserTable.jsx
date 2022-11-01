import "./usertable.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const UserTable = ({ users, setUsers, currentUsers }) => {
  const handleCheckChanged = (e) => {
    let { name, checked } = e.target;
    if (name === "all") {
      let temp = users.map((user) => (user = { ...user, isChecked: checked }));
      setUsers(temp);
    } else {
      let temp = users.map((user) =>
        name === user.name ? { ...user, isChecked: checked } : user
      );
      setUsers(temp);
    }
  };

  function handleSelectDelete() {
    let temp = users.filter((user) => user?.isChecked !== true);
    setUsers(temp);
  }
  function handleDelete(e) {
    let temp = users.filter((user) => user.name !== e.target.id);
    setUsers(temp);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox"
                name="all"
                checked={
                  users.filter((user) => user?.isChecked !== true).length < 1
                }
                onChange={handleCheckChanged}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={user?.isChecked || false}
                  onChange={handleCheckChanged}
                  name={user.name}
                />
              </td>
              <td width="20%">{user.name}</td>
              <td width="20%">{user.email}</td>
              <td width="20%">{user.role}</td>
              <td>
                <FiEdit className="edit" />
                <AiOutlineDelete
                  className="delete"
                  id={user.name}
                  onClick={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSelectDelete} className="deleteBtn">
        Delete Selected
      </button>
    </>
  );
};

export default UserTable;
