import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // Assuming you're using axios for API calls
import { serverAddress } from "../../envdata";
import { toast } from "react-toastify";

function UserActionModal({
  editData,
  setEditData,
  showModal,
  fetchUsers,
  handleClose,
  handleShow,
}) {
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(editData.active ? "Active" : "Suspended");
  }, [editData, setEditData]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setActive(newStatus);

    // Here you make the API call to update the user status
    try {
      const response = await axios.put(
        serverAddress + `/admin/user/status-action`,
        {
          userId: editData._id,
          action: newStatus,
        }
      );
      fetchUsers();
      handleClose();
      toast.success("User status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle the error or show an error message
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      centered // Vertically centers the modal
      size="sm" // Makes the modal smaller
    >
      <Modal.Header closeButton>
        <Modal.Title>User Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSelect">
            <Form.Label>Select Status</Form.Label>
            <Form.Control
              as="select"
              value={active}
              onChange={handleStatusChange} // Attach onChange handler
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserActionModal;
