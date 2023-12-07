import React from "react";
import "./AdminDashboard.scss";
import Chart from "./Chart/Chart";
import TotalUser from "./TotalUser/TotalUser";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-main">
      <TotalUser />
      <Chart />
    </div>
  );
};

export default AdminDashboard;
