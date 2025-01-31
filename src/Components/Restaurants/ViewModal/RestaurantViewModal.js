import React, { useState, useEffect, useRef } from "react";
import { serverAddress } from "../../../envdata";
import { toast } from "react-toastify";
import TagInput from "../../TagInput/TagInput";
import { IoMdClose } from "react-icons/io";
const RestaurantViewModal = ({
  fetchRestaurantsData,
  show = true,
  handleClose,
  setIsLoading,
  selectedRestaurant,
  setSelectedRestaurant,
}) => {
  const [editedRestaurant, setEditedRestaurant] = useState({
    business_name: selectedRestaurant?.business_name || "",
    phone: selectedRestaurant?.phone || "",
    address: selectedRestaurant?.address || "",
    email: selectedRestaurant?.email || "",
    // hashtags:selectedRestaurant?.hashtags || [],
  });

  const [cuisine, setCuisine] = useState({ hashtags: [] });

  const inputRef = useRef();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("profile_image", file);
          setIsLoading(true);
          const response = await fetch(
            `${serverAddress}/upload-rest-img/${selectedRestaurant._id}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data = await response.json();

          setSelectedRestaurant((prev) => ({
            ...prev,
            profile_image: data.restaurantData.profile_image,
          }));

          setIsLoading(false);
          toast.success("Image uploaded successfully");
        } catch (err) {
          setIsLoading(false);
          toast.error("Failed to upload image");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRestaurant((prevEdited) => ({
      ...prevEdited,
      [name]: value,
    }));
  };
  useEffect(() => {
    setEditedRestaurant({
      business_name: selectedRestaurant?.business_name || "",
      phone: selectedRestaurant?.phone || "",
      address: selectedRestaurant?.address || "",
      email: selectedRestaurant?.email || "",
      // });
    });
  }, [selectedRestaurant]);

  const handleUpdate = () => {
    if (!selectedRestaurant) return;

    const apiUrl = `${serverAddress}/update/restaurant/${selectedRestaurant._id}`;

    const editedFields = Object.keys(editedRestaurant).reduce((acc, key) => {
      if (editedRestaurant[key] !== "") {
        acc[key] = editedRestaurant[key];
      }
      return acc;
    }, {});

    if (Object.keys(editedFields).length === 0) {
      console.log("No fields were edited");
      return;
    }
    //cuisine
    // alert(JSON.stringify(editedFields));

    fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: editedFields, cuisine: cuisine }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        handleClose();
        fetchRestaurantsData();
        toast.success("Restaurant Updated Successfully");
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
      });
  };
  return (
    show && (
      <div className="modal-overlay ">
        <div
          style={{ maxHeight: "80vh" }}
          className="overflow-auto modal-container"
        >
          <div
            className="modal-header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              //   backgroundColor: "white",
            }}
          >
            {/* {JSON.stringify(selectedRestaurant.preferredCuisine)} */}
            <h5 className="modal-title">Restaurants Details</h5>
            <IoMdClose onClick={() => handleClose()} className="cursor" />
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Header */}

              {/* Profile Image */}
              <div className="col-12 row">
                <div className="col-6 mb-4"></div>
                <div className="col-6 mb-4">
                  <div className="text-center">
                    <h4 className="mt-3">Profile Image</h4>

                    <img
                      src={selectedRestaurant.profile_image}
                      className="img-fluid rounded mb-3"
                      width="200px"
                      alt="Restaurant Profile"
                    />

                    <input
                      className="form-control"
                      onChange={handleImageChange}
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              {/* Representative Image */}

              {/* Restaurant Name */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label htmlFor="business_name" className="h5">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    className="form-control"
                    placeholder="Restaurant Name"
                    onChange={handleInputChange}
                    value={editedRestaurant.business_name || ""}
                  />
                </div>
              </div>

              {/* Cuisine Hashtags */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label className="h5" htmlFor="hashtags">
                    #Hashtags
                  </label>
                  <TagInput
                    setEditedRestaurant={setEditedRestaurant}
                    value={editedRestaurant.hashtags}
                  />
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="form-group">
                  <label className="h5" htmlFor="hashtags">
                    #Cuisine
                  </label>
                  <TagInput
                    setEditedRestaurant={setCuisine}
                    value={selectedRestaurant.preferredCuisine}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label htmlFor="email" className="h5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={editedRestaurant.email || ""}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label htmlFor="phone" className="h5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    onChange={handleInputChange}
                    value={editedRestaurant.phone || ""}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label htmlFor="address" className="h5">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Enter Location"
                    value={editedRestaurant.address || ""}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Resy Search */}
              <div className="col-12 mb-4">
                <div className="form-group ">
                  <label htmlFor="resy" className="h5">
                    Find on Resy
                  </label>
                  <div className="row align-items-center">
                    <div className="col-10 ">
                      <input
                        type="text"
                        id="resy"
                        className="form-control"
                        placeholder="Enter Resy"
                        // onChange={handleResyInputChange}
                        // value={inputValue}
                      />
                    </div>
                    <div className="col-2 pb-2 ">
                      <button
                        // onClick={searchResy}
                        className="btn btn-outline-primary mt-2 w-100"
                      >
                        Find
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save URL */}
              <div className="col-12 mb-4">
                <div className="form-group">
                  <label htmlFor="save_url" className="h5">
                    Save URL
                  </label>
                  <div className="row align-items-center">
                    <div className="col-10 ">
                      <input
                        type="text"
                        id="resy"
                        className="form-control"
                        placeholder="Enter Resy"
                        // onChange={handleResyInputChange}
                        // value={inputValue}
                      />
                    </div>
                    <div className="col-2 pb-2 ">
                      <button
                        // onClick={searchResy}
                        className="btn btn-outline-primary mt-2 w-100"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-12 mb-4 d-flex justify-content-start gap-3">
                <button className="btn btn-success" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RestaurantViewModal;
