import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/Sidebar";
import Main from "./components/graphs/Main";
import InventoryTable from "./components/Inventory/Inventory";

function App() {
  return (
    <Router>
      {/* Header and Sidebar always visible */}
      <Header />
      <Sidebar />

      {/* Main content rendered dynamically based on route */}
      <Routes>
        {/* Route for Dashboard (Main) */}
        <Route path="/" element={<Main />} />

        {/* Route for Inventory */}
        <Route path="/inventory" element={<InventoryTable />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;
