import React, { useState, useEffect } from "react";
import Card from "../../Card/card";
import "../Dashboard/dashBoard.css";

import DashboardChart from "../charts/charts";
import TopSelling from "../../topSelling/topSelling";

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-10">
          <div className="row">
            {cards &&
              cards.length > 0 &&
              cards.map((card) => <Card key={card.id} card={card} />)}
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
      <DashboardChart />
      <TopSelling />
    </section>
  );
};

export default Dashboard;
