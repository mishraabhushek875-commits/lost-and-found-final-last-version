// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./page/SignUp";
import { Toaster } from "sonner";

// User Pages
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import LostItem from "./page/LostItem"; // list page
import FoundItem from "./page/FoundItem"; // list page
import Login from "./page/Login";
import Report from "./page/Report";
import ReportLost from "./page/ReportLost"; // form page
import ReportFound from "./page/ReportFound"; // form page

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminManageItems from "./admin/AdminManageItems";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";
import ItemDetail from "./page/ItemsDetail";
import AdminEditItem from "./admin/AdminEditItem";
import AdminClaimedItems from "./admin/claimedItem";

function App() {
  const location = useLocation();

  // Check if current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {/* Show user Navbar/Footer only if NOT on admin routes */}
      {!isAdminRoute && <Navbar />}
      <Toaster position="top-right" />

      {/* Routes */}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lost-item" element={<LostItem />} />
        <Route path="/found-item" element={<FoundItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        
        <Route path="/admin/manage-items" element={<AdminManageItems />} />
        <Route path="/admin/items/edit/:id" element={<AdminEditItem />} />
        <Route path="/admin/claim" element={<AdminClaimedItems />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
