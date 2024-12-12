// import React, { useState, useEffect } from "react";
// import Card from "../../Card/card";
import "../Dashboard/dashBoard.css";

import DashboardChart from "../charts/charts";
import TopSelling from "../../topSelling/topSelling";

const Dashboard = () => {
 
  return (
    <section className="dashboard section">
   
      <DashboardChart />
      <TopSelling />
    </section>
  );
};

export default Dashboard;
