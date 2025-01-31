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
  const [location, setLocation] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Restaurant Count:", restaurantCount);
    console.log("Location:", location);

    if (!restaurantCount || Object.keys(location).length == 0) {
      return alert("All feilds are required!");
    }
    const data = {
      restaurantCount, // Assuming these are defined
      location,
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
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <Autocomplete setLocation={setLocation} />
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
