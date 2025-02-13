import React, { useState } from "react";
import "./viewmodal.css";
import { serverAddress } from "../../../envdata";
import { toast } from "react-toastify";
const ViewModal = ({ isOpen, refereshData, setIsOpen, clearData, data }) => {
  // http://3.18.193.164:5000/removeReportedPost
  const handleRemovePost = async (id, reportId) => {
    if (!id) {
      return toast.info("The Post is already deleted");
    }
    try {
      const response = await fetch(serverAddress + "/removeReportedPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          reportId: reportId,
        }),
      });

      setIsOpen(false);
      toast.success("Post deleted successfully");
      clearData({});
      refereshData();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const handledeclineRequest = async (id) => {
    try {
      const response = await fetch(serverAddress + "/declineRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      setIsOpen(false);
      toast.success("Request declined successfully");
      clearData({});
      refereshData();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          {/* {JSON.stringify(data)} */}
          <div className="modal-container">
            <div className="modal-header">
              <h3>Reported Post</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setIsOpen(false);
                  clearData({});
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-row">
                <span className="label">Reported Post: </span>
                <span className="values">
                  {/* <img src="#" alt="Reported Post" /> */}
                  {/* {data?.reported_post?._id} */}
                  <img
                    height={100}
                    width={100}
                    src={data?.reported_post?.upload?.[0].mediapath}
                    alt="Poster Avatar"
                  />
                </span>
              </div>
              <div className="modal-row">
                <span className="label">Description:</span>
                <span className="value">{data?.reason}</span>
              </div>
              <div className="modal-row">
                <span className="label">Report By:</span>
                <span className="value">
                  <img
                    src={data?.reported_by?.profile_image}
                    alt="Poster Avatar"
                  />{" "}
                  {data?.reported_by?.username}
                </span>
              </div>
              <div className="modal-row">
                <span className="label">Post By:</span>
                <span className="value">
                  <img
                    src={data?.reported_user?.profile_image}
                    alt="Poster Avatar"
                  />{" "}
                  {data?.reported_user?.username}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() =>
                  handleRemovePost(data?.reported_post?._id, data._id)
                }
                className="accept-btn"
              >
                Accept
              </button>
              <button
                className="decline-btn"
                onClick={() => handledeclineRequest(data._id)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewModal;
