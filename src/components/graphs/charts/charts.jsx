import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

const DashboardChart = () => {
  const [filter, setFilter] = useState("This Month");

  // Sample sales data for the whole year
  const salesData = {
    today: [5000, 8000, 7000, 6000, 4000, 0, 0, 0, 0, 0, 0, 0],
    week: [12000, 30000, 25000, 35000, 20000, 0, 0, 0, 0, 0, 0, 0],
    month: [40000, 50000, 30000, 45000, 40000, 0, 0, 0, 0, 0, 0, 0],
  };

  // Labels for x-axis (months)
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

 
  const getOption = () => ({
    title: {
      show: false, 
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Sales"],
      left: "left",
    },
    xAxis: {
      type: "category",
      data: labels, 
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Sales",
        type: "bar",
        data:
          filter === "Today"
            ? salesData.today
            : filter === "This Week"
            ? salesData.week
            : salesData.month,
        itemStyle: {
          color: "#4CAF50", 
        },
        barWidth: "60%",
      },
    ],
  });

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Sales & Purchase</h5>
          {/* Filter dropdown */}
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
        <ReactECharts option={getOption()} style={{ height: 400 }} />
      </div>
    </div>
  );
};

export default DashboardChart;
