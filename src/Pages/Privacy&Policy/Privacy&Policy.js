import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { serverAddress } from "../../envdata";

const PrivacyPolicyPage = () => {
  const [policy, setPolicy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState("");

  const fetchPolicy = async () => {
    try {
      const response = await axios.get(serverAddress + "/get_policy");
      const fetchedPolicy = response.data.data[0].policy;
      setPolicy(fetchedPolicy);
      setNewPolicy(fetchedPolicy);
    } catch (error) {
      console.error("Error fetching policy:", error);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePolicyChange = (event) => {
    setNewPolicy(event.target.value);
  };

  const handleUpdatePolicy = async () => {
    try {
      await axios.post(serverAddress + "/update/64df1110e5c91441a3d965b7", {
        policy: newPolicy,
      });
      setPolicy(newPolicy);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating policy:", error);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2 header-heading">
        <h2>Privacy Policy</h2>
        <div className="d-flex gap-3">
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      </div>
      <div className="m-4 bg-light py-4 px-3 rounded-2">
        <textarea value={policy} rows={20} className="form-control" disabled />
      </div>

      {/* Modal for editing the policy */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="policyTextarea">
              <Form.Label>Policy Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={20}
                value={newPolicy}
                onChange={handlePolicyChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePolicy}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrivacyPolicyPage;
