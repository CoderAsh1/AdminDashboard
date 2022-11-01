import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import "./pagination.scss";

const Pagination = ({
  users,
  usersPerPage,
  handlePage,
  currentPage,
  setCurrentPage,
}) => {
  let totalPages = Math.ceil(users.length / usersPerPage);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  function handlePage(e) {
    setCurrentPage(e.target.innerText);
  }
  console.log(currentPage);
  return (
    <div className="pagination">
      <FiChevronsLeft className="extra" />
      <FiChevronLeft className="extra" />
      {pages.map((page) => (
        <button
          key={page}
          onClick={handlePage}
          id={currentPage === page ? "gray" : ""}
        >
          {page}{" "}
        </button>
      ))}
      <FiChevronRight className="extra" />
      <FiChevronsRight className="extra" />
    </div>
  );
};

export default Pagination;
