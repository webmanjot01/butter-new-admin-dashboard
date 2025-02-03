import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { serverAddress } from "../../../envdata";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import CustomLoader from "../../../Components/Loader/CustomLoader";
import ScrapRestaurantModal from "../../../Components/Restaurants/ScrapRestaurant/ScrapRestaurantModal";
import RestaurantViewModal from "../../../Components/Restaurants/ViewModal/RestaurantViewModal";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcSynchronize } from "react-icons/fc";
const RestaurantsLists = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isScraperLoading, setIsScraperLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Number of items per page
  const [page, setPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [restaurants, setRestaurants] = useState([]); // List of restaurants
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState("all");
  const navigate = useNavigate();
  function fetchRestaurants() {
    try {
      const url = `${serverAddress}/admin/get-all/restaurants?page=${page}&limit=${limit}&search=${search}&status=${isActive}`;
      setIsTableLoading(true);
      axios
        .get(url)
        .then((response) => {
          setRestaurants(response.data.items);
          setTotalItems(response.data.total_items);
          setTotalPages(response.data.total_pages);
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

  useEffect(() => {
    fetchRestaurants();
  }, [page, search, isActive]); // Refetch when the page changes

  // Handling the page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const [isScraperOpen, setIsScraperOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const handleClose = () => {
    setIsView(false);
    setSelectedData({});
  };

  const handleDelete = (restaurantId) => {
    axios
      .delete(`${serverAddress}/remove/restaurant/${restaurantId}`)
      .then((response) => {
        toast.success("Restaurant deleted Successfully");
        fetchRestaurants();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting restaurant:", error);
      });
  };

  const addToButterBest = (id) => {
    let uri = serverAddress + "/admin/add-butterbest-restaurant/" + id;

    axios
      .post(uri)
      .then((response) => {
        toast.success("Restaurant Added to #ButterBest");
        fetchRestaurants();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
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

  const handleVerifyRestaurant = (id) => {
    let uri = serverAddress + "/admin/verify-restaurant/" + id;
    axios
      .post(uri)
      .then((response) => {
        toast.success("Restaurant verified");
        fetchRestaurants();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <>
      {isScraperLoading && <CustomLoader />}
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2">
        <h2>All Restaurants</h2>
        <div className="d-flex gap-3">
          <Button
            onClick={() => navigate("/admin/restaurant/add")}
            variant="outline-info"
            className="btn-sm"
          >
            Add Restaurant
          </Button>
          <Button
            onClick={() => setIsScraperOpen(true)}
            variant="outline-success"
            className="btn-sm"
          >
            Scrape Restaurant
          </Button>
        </div>
      </div>
      <div className="m-4 bg-light pt-4 px-3 pb-0 rounded-2">
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
              <option value={"Pending"}>Pending</option>
              <option value={"Verified"}>Verified</option>
            </select>
          </div>
        </div>

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
                <tr key={item._id}>
                  <td>{item.business_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    {item.restaurant_status}{" "}
                    {item.restaurant_status === "pending" && (
                      <FcSynchronize
                        onClick={() => handleVerifyRestaurant(item._id)}
                        className="cursor"
                        size={25}
                      />
                    )}
                  </td>
                  <td>
                    <FaPen
                      onClick={() => {
                        setIsView(true);
                        setSelectedData(item);
                      }}
                      className="mx-2 cursor"
                      color="#34ebb1"
                    />
                    <MdDelete
                      onClick={() => handleDelete(item._id)}
                      className="mx-3 cursor"
                      color="#f2645a"
                    />
                    {!item.titleTag && (
                      <RiHeartAdd2Fill
                        onClick={() => addToButterBest(item._id)}
                        className="mx-2 cursor"
                        color="#db34eb"
                      />
                    )}
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

        <ScrapRestaurantModal
          show={isScraperOpen}
          setIsLoading={setIsScraperLoading}
          handleClose={setIsScraperOpen}
          fetchRestaurantsData={fetchRestaurants}
        />

        <RestaurantViewModal
          setIsLoading={setIsScraperLoading}
          show={isView}
          fetchRestaurantsData={fetchRestaurants}
          setSelectedRestaurant={setSelectedData}
          selectedRestaurant={selectedData}
          handleClose={handleClose}
        />
      </div>
    </>
  );
};

export default RestaurantsLists;
