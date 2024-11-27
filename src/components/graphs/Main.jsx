import React from "react";
import "../graphs/main.css";
import PageTitle from "./Page/PageTitle";
import Dashboard from "./Dashboard/Dashboard";

const Main = () => {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard" />
      <Dashboard />
    </main>
  );
};

export default Main;
