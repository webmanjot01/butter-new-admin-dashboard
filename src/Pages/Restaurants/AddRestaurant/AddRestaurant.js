import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Autocomplete from "../../../Components/Restaurants/ScrapRestaurant/Autocomplete";
import TagInput from "../../../Components/TagInput/TagInput";
import { serverAddress } from "../../../envdata";
import WorkingHoursForm from "./WorkingHoursForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../../Components/Loader/CustomLoader";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLOading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    profile_image: "",
    representativeID: "",
    description: "",
    business_name: "",
    latitude: "",
    longitude: "",
    taxid: "",
    restaurant_status: "pending",
    hashtags: [],
    google_id: "",
    kgmid: "",
    full_address: "",
    postal_code: "",
    city: "",
    country: "",
    country_code: "",
    state: "",
    rating: 1,
    reviews: 0,
    photos_count: 0,
    website: "",
    booking_link: "",
    photo: "",
    street_view: "",
    restaurant_status: "verified",
    business_status: "OPERATIONAL",
    range: "",
  });

  const [working_hours, setWorkingHrs] = useState({});

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submission
  const validateForm = () => {
    const {
      email,
      phone,
      business_name,
      profile_image,
      full_address,
      postal_code,
    } = formData;

    if (!business_name) {
      alert("Business Name is required");
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Valid Email is required");
      return false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      alert("Phone number should be 10 digits");
      return false;
    }
    if (!profile_image) {
      alert("Profile Image is required");
      return false;
    }
    if (!full_address) {
      alert("Full Address is required");
      return false;
    }
    if (!postal_code) {
      alert("Postal code is required");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all form data to FormData object
      Object.keys(formData).forEach((key) => {
        if (key === "profile_image") {
          console.log(formData[key]);
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append("working_hours", JSON.stringify(working_hours));
      setIsLOading(true);
      await axios.post(
        serverAddress + "/admin/add/restaurants",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Restaurant Added Successfully!");
      navigate("/admin/restaurants/list");
      setIsLOading(false);
    } catch (error) {
      setIsLOading(false);
      console.error("Error:", error);
      alert("Failed to add restaurant.");
    }
  };
  const [rating, setRating] = useState(0); // State to store the selected rating

  const handleRatingChange = (newRating) => {
    setRating(newRating + 1);
    setFormData((pre) => ({ ...pre, rating: newRating + 1 }));
  };
  return (
    <>
      {isLoading && <CustomLoader />}

      <div className="m-4 bg-light p-3 rounded-2 header-heading">
        <h2>Add Restaurant</h2>
      </div>
      <div className="m-4 bg-light pt-4 px-3 pb-0 rounded-2">
        <Row>
          <Col md={6}>
            <Form.Group controlId="business_name">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="profile_image">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={(e) =>
                  setFormData((pre) => ({
                    ...pre,
                    profile_image: e.target.files[0],
                  }))
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Autocomplete
                setLocation={(data) => {
                  setFormData({ ...formData, ...data });
                }}
              />
            </Form.Group>

            <Form.Group controlId="latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="booking_link">
              <Form.Label>Booking URL</Form.Label>
              <Form.Control
                type="text"
                name="booking_link"
                value={formData.booking_link}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="Cuisines">
              <Form.Label>Cuisines / HashTags</Form.Label>
              <TagInput
                setEditedRestaurant={setFormData}
                value={formData.hashtags}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="full_address">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                type="text"
                name="full_address"
                value={formData.full_address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="postal_code">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="business_status">
              <Form.Label>Business Status</Form.Label>
              <Form.Control
                as="select"
                name="business_status"
                value={formData.business_status}
                onChange={handleChange}
              >
                <option value="OPERATIONAL">Operational</option>
                <option value="CLOSED">Closed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rating">
              <div className="mt-2">Rating</div>
              <div className="rating mb-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${
                      index < formData.rating ? "filled" : ""
                    }`}
                    onClick={() => handleRatingChange(index)}
                  >
                    ★
                  </span>
                ))}
                <span className="ms-3">{formData.rating}</span>
              </div>
              {/* <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              /> */}
            </Form.Group>

            <Form.Group controlId="working_hours">
              <Form.Label>Working Hours</Form.Label>
              <WorkingHoursForm
                working_hours={working_hours}
                setWorkingHrs={setWorkingHrs}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          onClick={handleSubmit}
          type="submit"
          className="mt-3"
        >
          Add Restaurant
        </Button>
      </div>
    </>
  );
};

export default AddRestaurant;
