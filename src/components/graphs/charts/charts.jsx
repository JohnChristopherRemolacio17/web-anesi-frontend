import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { db } from "../../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const DashboardChart = () => {
  const [filter, setFilter] = useState("Daily");
  const [salesData, setSalesData] = useState({
    daily: Array(7).fill(0),
    weekly: Array(4).fill(0),
    monthly: Array(12).fill(0),
  });
  const [loading, setLoading] = useState(true);

  const processSalesData = (docs) => {
    // Reset sales data
    const daily = Array(7).fill(0);
    const weekly = Array(4).fill(0);
    const monthly = Array(12).fill(0);

    docs.forEach((doc) => {
      const data = doc.data();

      if (data.dateCreated && data.price) {
        const date = data.dateCreated.toDate(); // Convert Firestore timestamp to Date
        const price = parseFloat(data.price) || 0.0;

        // Calculate daily sales (0 = Sunday, 6 = Saturday)
        const dayIndex = (date.getDay() + 6) % 7; // Adjust to Monday as the first day
        if (dayIndex >= 0 && dayIndex < 7) {
          daily[dayIndex] += price;
        }

        // Calculate weekly sales (divide days into 4 weeks per month)
        const weekIndex = Math.floor((date.getDate() - 1) / 7); // Week 0, 1, 2, 3
        if (weekIndex >= 0 && weekIndex < 4) {
          weekly[weekIndex] += price;
        }

        // Calculate monthly sales (1 = January, 12 = December)
        const monthIndex = date.getMonth(); // Month is 0-based
        if (monthIndex >= 0 && monthIndex < 12) {
          monthly[monthIndex] += price;
        }
      }
    });

    setSalesData({ daily, weekly, monthly });
    setLoading(false);
  };

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    // Set up a Firestore real-time listener
    const unsubscribe = onSnapshot(
      ordersCollection,
      (snapshot) => {
        const docs = snapshot.docs;
        processSalesData(docs); // Process the documents into sales data
      },
      (error) => {
        console.error("Error fetching real-time sales data: ", error);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const labels = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    monthly: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  };

  const getOption = () => ({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Sales"],
      left: "left",
    },
    xAxis: {
      type: "category",
      data: labels[filter.toLowerCase()],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Sales",
        type: "line",
        data: salesData[filter.toLowerCase()],
        itemStyle: {
          color: "#FF9800",
        },
        lineStyle: {
          width: 2,
        },
        smooth: true,
      },
    ],
  });

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Sales</h5>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactECharts option={getOption()} style={{ height: 400 }} />
        )}
      </div>
    </div>
  );
};

export default DashboardChart;
