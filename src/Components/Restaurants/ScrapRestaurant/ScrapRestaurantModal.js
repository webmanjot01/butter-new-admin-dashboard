import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import Autocomplete from "./Autocomplete";

import { toast } from "react-toastify";
import { serverAddress } from "../../../envdata";

const ScrapRestaurantModal = ({
  fetchRestaurantsData,
  show = true,
  handleClose,
  setIsLoading,
}) => {
  const [restaurantCount, setRestaurantCount] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [selectedStar, setSelectedStar] = useState("4");
  const [location, setLocation] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Restaurant Count:", restaurantCount);
    console.log("Location:", location);

    if (!restaurantCount) {
      return alert("All feilds are required!");
    }
    if (!restaurantName && Object.keys(location).length == 0) {
      // If neither Location nor RestaurantName has a value, assign default values
      return alert("All feilds are required!");
    }

    const data = {
      restaurantCount, // Assuming these are defined
      restaurantName,
      location,
      selectedStar,
    };
    setIsLoading(true);
    try {
      const response = await fetch(serverAddress + "/scrape-restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response:", result);
      if (result.status) {
        toast.success(`${result.count} new restaurants adedd`);
        fetchRestaurantsData("all");
        setRestaurantCount(null);
        setRestaurantName(null);
        setLocation({});
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Something went wrong`);
      setIsLoading(false);
    }

    handleClose(false);
  };

  return (
    show && (
      <div className="modal-overlay">
        {/* {JSON.stringify(data)} */}
        <div className="modal-container ">
          <div className="modal-header">
            <h5 className="modal-title">Scrape Restaurants</h5>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="restaurantCount" className="form-label">
                  Maximum Number of Restaurants
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="restaurantCount"
                  value={restaurantCount}
                  onChange={(e) => setRestaurantCount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantCount" className="form-label">
                  Select Minimum Star
                </label>
                <select
                  className="form-select"
                  value={selectedStar}
                  onChange={(e) => setSelectedStar(e.target.value)}
                >
                  {/* <option value="">Please select an option</option> */}
                  <option value="1">1 Star and above</option>
                  <option value="2">2 Star and above</option>
                  <option value="3">3 Star and above</option>
                  <option value="4">4 Star and above</option>
                  <option value="5">5 Star</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <Autocomplete setLocation={setLocation} />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: "1px solid black",
                    margin: "0 10px",
                  }}
                />
                <span>or</span>
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: "1px solid black",
                    margin: "0 10px",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantName" className="form-label">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurantName"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </div>
              <div className="mt-5  d-flex justify-content-between">
                <button type="submit" className="btn btn-primary mt-4">
                  Submit
                </button>

                {/* Make sure the onClick event doesn't submit the form */}
                <button
                  type="button"
                  onClick={() => {
                    handleClose(false);
                    setRestaurantCount(null);
                    setLocation({});
                  }}
                  className="btn btn-secondary mt-4" // Optional: Use a different style for the cancel button
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ScrapRestaurantModal;
