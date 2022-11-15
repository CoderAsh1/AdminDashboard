import "./usertable.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";

const UserTable = ({
  users,
  setUsers,
  currentUsers,
  indexOfFirstUser,
  indexOfLastUser,
}) => {
  //control the checkbox
  const handleCheckChanged = (e) => {
    let { name, checked } = e.target;
    if (name === "all") {
      let temp = users.map((user, index) =>
        indexOfFirstUser <= index && index < indexOfLastUser
          ? (user = { ...user, isChecked: checked })
          : user
      );
      console.log(temp);
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
  function handleBtnDelete(e) {
    let temp = users.filter((user) => user.name !== e.target.id);
    setUsers(temp);
  }
  function handleEdit(e) {
    let x = prompt("enter the name");
    let y = prompt("enter email");
    let z = prompt("enter role");
    let temp = users.map((user) =>
      user.name === e.target.id
        ? {
            ...user,
            name: x ? x : user.name,
            email: y ? y : user.email,
            role: z ? z : user.role,
          }
        : user
    );
    setUsers(temp);
  }

  return (
    <>
      <table>
        <thead>
          <tr className="rows">
            <th>
              <input
                type="checkbox"
                className="checkbox"
                name="all"
                checked={
                  currentUsers.filter((user) => user?.isChecked !== true)
                    .length < 1
                }
                onChange={(e) => handleCheckChanged(e)}
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
            <tr key={i} className="rows" id={user.id}>
              <td>
                <input
                  type="checkbox"
                  id={user.id}
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
                <FiEdit
                  className="edit"
                  onClick={handleEdit}
                  id={user.name}
                  email={user.email}
                />
                <AiOutlineDelete
                  className="delete"
                  id={user.name}
                  onClick={handleBtnDelete}
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
