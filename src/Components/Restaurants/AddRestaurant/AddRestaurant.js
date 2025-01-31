import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    userId: "",
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
    Cuisines: "",
    google_id: "",
    kgmid: "",
    full_address: "",
    postal_code: "",
    city: "",
    country: "",
    country_code: "",
    state: "",
    rating: 0,
    reviews: 0,
    photos_count: 0,
    website: "",
    reviews_link: "",
    photo: "",
    street_view: "",
    business_status: "OPERATIONAL",
    range: "",
    owner_id: "",
    owner_title: "",
    owner_link: "",
    location_link: "",
    location_reviews_link: "",
    dietaryPreferences: [],
    preferredCuisine: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/restaurants", formData);
      alert("Restaurant Added Successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add restaurant.");
    }
  };

  return (
    <>
      <div className="m-4 bg-light p-3 rounded-2">
        {" "}
        <h2>Add Restaurant </h2>
      </div>
      <div className=" m-4 bg-light pt-4 px-3 pb-0 rounded-2 ">
        <Form onSubmit={handleSubmit}>
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

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="profile_image">
                <Form.Label>Profile Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="profile_image"
                  value={formData.profile_image}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="representativeID">
                <Form.Label>Representative ID</Form.Label>
                <Form.Control
                  type="text"
                  name="representativeID"
                  value={formData.representativeID}
                  onChange={handleChange}
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

              <Form.Group controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
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
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="Cuisines">
                <Form.Label>Cuisines</Form.Label>
                <Form.Control
                  type="text"
                  name="Cuisines"
                  value={formData.Cuisines}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="google_id">
                <Form.Label>Google ID</Form.Label>
                <Form.Control
                  type="text"
                  name="google_id"
                  value={formData.google_id}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="kgmid">
                <Form.Label>KGMID</Form.Label>
                <Form.Control
                  type="text"
                  name="kgmid"
                  value={formData.kgmid}
                  onChange={handleChange}
                />
              </Form.Group>

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

              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
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
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="reviews">
                <Form.Label>Number of Reviews</Form.Label>
                <Form.Control
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Add Restaurant
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddRestaurant;
