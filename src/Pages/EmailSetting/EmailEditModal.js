import React, { useState, useEffect } from "react";
import { serverAddress } from "../../envdata";
import { toast } from "react-toastify";

const EmailEditModal = ({ fetchAdmins, editData }) => {
  // Initialize state variables
  const [email, setEmail] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Populate form fields with editData (if any)
  useEffect(() => {
    if (editData) {
      setEmail(editData.email || "");
      setSmtpPassword(editData.password || "");
      setSmtpPort(editData.port || "");
      setSmtpHost(editData.host || "");
    }
  }, [editData]);

  // Handle form input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSmtpPasswordChange = (e) => setSmtpPassword(e.target.value);
  const handleSmtpPortChange = (e) => setSmtpPort(e.target.value);
  const handleSmtpHostChange = (e) => setSmtpHost(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      smtpemail: email,
      smtppassword: smtpPassword,
      smtpport: smtpPort,
      smtphost: smtpHost,
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
              <h5 className="modal-title"> Edit SMTP Email Configuration</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="p-3 modal-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="form-group">
                  <label>SMTP Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={smtpPassword}
                    onChange={handleSmtpPasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label>SMTP Port</label>
                  <input
                    type="text"
                    className="form-control"
                    value={smtpPort}
                    onChange={handleSmtpPortChange}
                  />
                </div>
                <div className="form-group">
                  <label>SMTP Host</label>
                  <input
                    type="text"
                    className="form-control"
                    value={smtpHost}
                    onChange={handleSmtpHostChange}
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

export default EmailEditModal;
