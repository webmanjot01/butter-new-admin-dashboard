import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { serverAddress } from "../../envdata";
import { FaPen } from "react-icons/fa";
import UserActionModal from "./UserActionModal";
import CSVExport from "../../Components/CSVExport/CSVExport";
const UsersList = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Number of items per page
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState("all");
  const fetchUsers = async () => {
    setIsTableLoading(true);
    try {
      const response = await fetch(
        `${serverAddress}/admin/get-all/user?page=${page}&limit=${limit}&search=${search}&active=${isActive}`
      );
      const users = await response.json();
      //   console.log(users);
      setUsers(users.items);
      setTotalItems(users.total_items);
      setTotalPages(users.total_pages);
      setIsTableLoading(false);
    } catch (error) {
      console.log(error);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, isActive]);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setEditData({});
  };
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2 header-heading">
        {" "}
        <h2>All Users </h2>
        <CSVExport api={`${serverAddress}/admin/get-all/user?isExport=true`} />
      </div>
      <div className=" m-4 bg-light pt-4 px-3 pb-0 rounded-2 ">
        <div className="d-flex justify-content-between bg-light py-3 rounded-2">
          <div className="d-flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="Search"
            />
          </div>
          <div className="d-flex gap-3">
            <select
              class="form-select"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              aria-label="Default select example"
            >
              <option value={"all"}>All</option>
              <option value={false}>Suspended</option>
              <option value={true}>Active</option>
            </select>
          </div>
        </div>
        {/* Responsive Table */}
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {!isTableLoading && (
            <tbody>
              {users.map((item, ind) => (
                <tr key={item.id}>
                  <td>
                    <img height={20} src={item.profile_image} /> {item.username}
                  </td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.active ? "Active" : "Suspended"}</td>
                  <td>
                    <FaPen
                      onClick={() => {
                        handleShow();
                        setEditData(item);
                      }}
                      className="cursor"
                      color="#34ebb1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>

        {isTableLoading ? (
          <>
            <div
              style={{ minHeight: "380px" }}
              className="d-flex justify-content-center align-items-center text-center"
            >
              <div class="spinner-border text-success" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </>
        ) : (
          <>
            {users.length == 0 && (
              <div
                style={{ minHeight: "380px" }}
                className="d-flex justify-content-center align-items-center text-center"
              >
                No Restaurants Found
              </div>
            )}
          </>
        )}
        {/* Pagination */}
        <div className="d-flex justify-content-center pb-3">
          <Button
            variant="outline-secondary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="mx-2 align-self-center">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
        <UserActionModal
          editData={editData}
          setEditData={setEditData}
          fetchUsers={fetchUsers}
          showModal={showModal}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      </div>
    </>
  );
};

export default UsersList;
