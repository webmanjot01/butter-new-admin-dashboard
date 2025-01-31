import React from "react";
import CountUp from "react-countup";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        {[45686, 145794, 789458, 475896, 458796, 488565].map((value, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3">
            <div className="dashboard-card">
              <CountUp
                className="counter-number"
                start={0}
                end={value}
                duration={4}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
