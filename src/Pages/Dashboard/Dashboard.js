import React from "react";
import CountUp from "react-countup";
import "./dashboard.css";

function Dashboard() {
  const data = [
    { lable: "Users", value: 50 },
    { lable: "Restaurants", value: 10000 },
    { lable: "ButterBest", value: 2000 },
    { lable: "Posts", value: 3000 },
    { lable: "Reported Posts", value: 500 },
  ];
  return (
    <div className="container">
      <div className="row">
        {data.map((value, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3">
            <div className="dashboard-card">
              <CountUp
                className="counter-number"
                start={0}
                end={value.value}
                duration={4}
              />
              <h3>{value.lable}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
