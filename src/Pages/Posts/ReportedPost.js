import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { serverAddress } from "../../envdata";
import axios from "axios";
import { FaEye, FaPen } from "react-icons/fa";
import ViewModal from "../../Components/Posts/ReportedPost/ViewModal";

function ReportedPost() {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isScraperLoading, setIsScraperLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Number of items per page
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [restaurants, setRestaurants] = useState([]); // List of restaurants
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState("all");

  function fetchRestaurants() {
    try {
      const url = serverAddress + `/getallReportpost`;
      setIsTableLoading(true);
      axios
        .get(url)
        .then((response) => {
          setRestaurants(response.data.data);
          // setTotalItems(response.data.total_items);
          // setTotalPages(response.data.total_pages);
          setIsTableLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsTableLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const [singleData, setSelectedData] = useState({});
  const [isView, setIsView] = useState(false);
  useEffect(() => {
    fetchRestaurants();
  }, [page, search, isActive]); // Refetch when the page changes
  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2">
        <h2>Reported Posts</h2>
        <div className="d-flex gap-3"></div>
      </div>
      <div className="m-4 bg-light pt-4 px-3 pb-0 rounded-2">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Sr.no.</th>
              <th> ReportedBy</th>
              <th>Post Id</th>
              <th> Reported User</th>
              <th>Actions</th>
            </tr>
          </thead>
          {!isTableLoading && (
            <tbody>
              {restaurants.map((item, ind) => (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>{item?.reported_by?.username}</td>
                  <td>{item?.reported_post?._id}</td>
                  <td>{item?.reported_user?.username}</td>
                  <td>
                    <FaEye
                      onClick={() => {
                        setIsView(true);
                        setSelectedData(item);
                      }}
                      className="mx-2 cursor"
                      color="#34ebb1"
                    />{" "}
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
            {restaurants.length == 0 && (
              <div
                style={{ minHeight: "380px" }}
                className="d-flex justify-content-center align-items-center text-center"
              >
                No Restaurants Found
              </div>
            )}
          </>
        )}

        {/* Pagination Controls */}

        <div className="d-flex justify-content-center pb-3">
          <Button
            variant="outline-secondary"
            // onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="mx-2 align-self-center">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            // onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <ViewModal
        isOpen={isView}
        setIsOpen={setIsView}
        clearData={setSelectedData}
        data={singleData}
      />
    </div>
  );
}

export default ReportedPost;
