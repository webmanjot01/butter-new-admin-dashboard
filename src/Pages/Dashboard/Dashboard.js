import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./dashboard.css";
import { serverAddress } from "../../envdata";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const api = `${serverAddress}/admin/dashboard-stats`; // Correct API endpoint

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setStats(data.stats); // Assuming your API response returns an array of stats
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, [api]); // Dependency array to rerun if the api changes

  return (
    <div className="container">
      <div className="row">
        {stats.length > 0 ? (
          stats.map((value, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="dashboard-card">
                <CountUp
                  className="counter-number"
                  start={0}
                  end={value.value}
                  duration={4}
                />
                <h3>{value.lable}</h3> {/* Fixed typo from lable to label */}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Display loading state while data is being fetched
        )}
      </div>
    </div>
  );
}

export default Dashboard;
