import React, { useState, useEffect } from "react";
import { serverAddress } from "../../envdata";
import { toast } from "react-toastify";

const LocationSettingModal = ({ fetchAdmins, editData }) => {
  // Initialize state variables
  const [distance, setdistance] = useState(0);

  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Populate form fields with editData (if any)
  useEffect(() => {
    if (editData) {
      setdistance(editData.distance || "");
    }
  }, [editData]);

  // Handle form input changes
  const handledistanceChange = (e) => setdistance(+e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      distance: distance,
    };

    try {
      const response = await fetch(
        `${serverAddress}/admin/smtp-edit/64df1110e5c91441a3d965b7`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update email configuration.");
      }

      toast.success("Email configuration updated successfully!");
      fetchAdmins(); // Refresh the admin list after the update
      toggleModal(); // Close modal after submit
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary" onClick={toggleModal}>
        Edit
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div
            style={{ maxHeight: "80vh" }}
            className="overflow-auto modal-container"
          >
            <div className="modal-header">
              <h5 className="modal-title"> Edit Location</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="p-3 modal-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Enter Nearby Locations</label>
                  <input
                    type="distance"
                    className="form-control"
                    value={distance}
                    onChange={handledistanceChange}
                  />
                </div>
                <div className="modal-body">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSettingModal;
