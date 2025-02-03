import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { serverAddress } from "../../../envdata";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const ButterBestLists = () => {
  const [limit, setLimit] = useState(10); // Number of items per page
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  function fetchRestaurants() {
    try {
      const url = `${serverAddress}/admin/get-all/butterbest?page=${page}&limit=${limit}`;
      setIsTableLoading(true);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.restaurants);

          setRestaurants(response.data.items);
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
    fetchRestaurants();
  }, [page]);
  // Sample data with 10 columns
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const removeFromButterBest = (id) => {
    let uri = serverAddress + "/admin/remove-butterbest-restaurant/" + id;

    axios
      .post(uri)
      .then((response) => {
        toast.success("Restaurant removed from #ButterBest");
        fetchRestaurants();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2">
        <h2>Butter Best</h2>
      </div>
      {/* {JSON.stringify(currentItems[0])} */}
      <div className=" m-4 bg-light pt-4 px-3 pb-0 rounded-2 ">
        {/* Responsive Table */}
        <Table hover responsive>
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {!isTableLoading && (
            <tbody>
              {restaurants.map((item) => (
                <tr>
                  <td>{item.business_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.restaurant_status}</td>
                  <td>
                    <IoIosCloseCircleOutline
                      onClick={() => removeFromButterBest(item._id)}
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
    </>
  );
};

export default ButterBestLists;
