import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { serverAddress } from "../../../envdata";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ButterBestLists = () => {
  const [limit, setLimit] = useState(10); // Number of items per page
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  const [restaurants, setRestaurants] = useState([]);
  function fetchRestaurants() {
    try {
      const url = `${serverAddress}/admin/get-all/butterbest?page=${page}&limit=${limit}`;

      axios
        .get(url)
        .then((response) => {
          console.log(response.data.restaurants);

          setRestaurants(response.data.restaurants);
          setTotalItems(response.data.total_items);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);
  // Sample data with 10 columns
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
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
          <tbody>
            {restaurants.map((item) => (
              <tr>
                <td>{item.business_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.restaurant_status}</td>
                <td>
                  <FaPen className="mx-2 cursor" color="#34ebb1" />{" "}
                  <MdDelete className="mx-3 cursor" color="#f2645a" />
                  <IoIosCloseCircleOutline
                    className="mx-2 cursor"
                    color="#db34eb"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {restaurants.length == 0 && (
          <div
            style={{ minHeight: "370px" }}
            className="d-flex justify-content-center align-items-center text-center"
          >
            No Users Found
          </div>
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
