import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { serverAddress } from "../../envdata";
import LocationSettingModal from "./LocationSettingModal";

const LocationSettings = () => {
  const [location, setLoaction] = useState(0);

  const fetchSmtpCredentials = async () => {
    try {
      const response = await axios.get(serverAddress + "/getdistance");
      if (response.data.status && response.data.data.length > 0) {
        const smtpData = response.data.data[0];
        setLoaction(response.data.data[0].distance);
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchSmtpCredentials();
  }, []);

  return (
    <div>
      <div className="m-4 d-flex justify-content-between bg-light p-3 rounded-2 header-heading">
        <h2>Location Setting</h2>
        <div className="d-flex gap-3">
          <LocationSettingModal
            fetchAdmins={fetchSmtpCredentials}
            editData={{ distance: location }}
          />
        </div>
      </div>
      <div className="m-4 bg-light py-4 px-3  rounded-2">
        <div className="form-group">
          <label>Nearby Locations</label>
          <input
            type="text"
            className="form-control"
            value={location}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;
