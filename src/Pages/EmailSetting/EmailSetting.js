import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { serverAddress } from "../../envdata";

const EmailSetting = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("");
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSmtpCredentials = async () => {
      try {
        const response = await axios.get(serverAddress + "/getsmtp");
        if (response.data.status && response.data.data.length > 0) {
          const smtpData = response.data.data[0];
          setEmail(smtpData.smtpemail);
          setPassword(smtpData.smtppassword);
          setPort(smtpData.smtpport);
          setHost(smtpData.smtphost);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSmtpCredentials();
  }, []);

  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2">
        <h2>SMTP Email Configuration</h2>
        <div className="d-flex gap-3">
          <Button variant="primary">Edit</Button>
        </div>
      </div>
      <div className="m-4 bg-light py-4 px-3  rounded-2">
        <form>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>SMTP Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>SMTP Port</label>
            <input type="text" className="form-control" value={port} readOnly />
          </div>
          <div className="form-group">
            <label>SMTP Host</label>
            <input type="text" className="form-control" value={host} readOnly />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSetting;
