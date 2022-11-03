import "./usertable.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const UserTable = ({
  users,
  setUsers,
  currentUsers,
  indexOfFirstUser,
  indexOfLastUser,
}) => {
  const handleCheckChanged = (e) => {
    let checkBox = document.querySelector("check");
    let { name, checked } = e.target;
    if (name === "all") {
      let temp = currentUsers.map(
        (user) => (user = { ...user, isChecked: checked })
      );
      users.splice(indexOfFirstUser, indexOfLastUser);
      setUsers((prev) => [...temp.concat(prev)]);
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
  function handleEdit(e) {
    console.log(e.target.id);
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
                  currentUsers.filter((user) => user?.isChecked !== true)
                    .length < 1
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
                  id="check"
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
                <FiEdit className="edit" onClick={handleEdit} id={user.name} />
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
