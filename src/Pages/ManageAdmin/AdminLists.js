import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { serverAddress } from "../../envdata";
import AddAdminModal from "./AddAdminModal";

function AdminLists() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [admins, setAdmins] = useState([]);

  function fetchAdmins() {
    try {
      const url = `${serverAddress}/getalladmins?currentPage=${page}&perPage=${limit}`;
      setIsTableLoading(true);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.details.admin);

          setAdmins(response.data.details.admin);
          setTotalItems(response.data.pagination.totalItems);
          setTotalPages(response.data.pagination.totalPages);
          setIsTableLoading(false);
        })
        .catch((error) => {
          setIsTableLoading(false);
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const removeAdmin = (id) => {
    let uri = serverAddress + "/admin/remove-admin/" + id;

    axios
      .delete(uri)
      .then((response) => {
        toast.success("Admin removed successfully");
        fetchAdmins();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2 header-heading">
        <h2>Admin List</h2>
        <AddAdminModal fetchAdmins={fetchAdmins} />
      </div>
      <div className="m-4 bg-light pt-4 px-3 pb-0 rounded-2">
        {/* Responsive Table */}
        <Table hover responsive>
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Email</th>

              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          {!isTableLoading && (
            <tbody>
              {admins.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.profile_image} height={30} /> {item.username}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.type}</td>
                  <td>
                    <IoIosCloseCircleOutline
                      onClick={() => removeAdmin(item._id)}
                      className="mx-2 cursor"
                      color="#db34eb"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>

        {isTableLoading ? (
          <div
            style={{ minHeight: "380px" }}
            className="d-flex justify-content-center align-items-center text-center"
          >
            <div className="spinner-border text-success" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <>
            {admins.length === 0 && (
              <div
                style={{ minHeight: "380px" }}
                className="d-flex justify-content-center align-items-center text-center"
              >
                No Admins Found
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
      </div>
    </div>
  );
}

export default AdminLists;
