import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { serverAddress } from "../../envdata";

const TermsConditionsPage = () => {
  const [terms, setTerms] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTerms, setNewTerms] = useState("");

  const fetchTerms = async () => {
    try {
      const response = await axios.get(`${serverAddress}/getterms_conditions`);
      const fetchedTerms = response.data.data[0].terms_conditions;
      setTerms(fetchedTerms);
      setNewTerms(fetchedTerms);
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTermsChange = (event) => {
    setNewTerms(event.target.value);
  };

  const handleUpdateTerms = async () => {
    try {
      await axios.post(`${serverAddress}/update/64df1110e5c91441a3d965b7`, {
        terms_conditions: newTerms,
      });
      setTerms(newTerms);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating terms and conditions:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2">
        <h2>Terms and Conditions</h2>
        <div className="d-flex gap-3">
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      </div>
      <div className="m-4 bg-light py-4 px-3  rounded-2">
        <textarea value={terms} rows={20} className="form-control" disabled />
      </div>

      {/* Modal for editing the terms and conditions */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="termsTextarea">
              <Form.Label>Terms and Conditions Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={20}
                value={newTerms}
                onChange={handleTermsChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTerms}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermsConditionsPage;
