import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./page/SignUp";
import { Toaster } from "sonner";

import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import LostItem from "./page/LostItem";
import FoundItem from "./page/FoundItem";
import Login from "./page/Login";
import Report from "./page/Report";
import ReportLost from "./page/ReportLost";
import ReportFound from "./page/ReportFound";
import MyClaim from "./page/MyClaim";
import ItemDetail from "./page/ItemsDetail";
import VerifyOtp from "./page/VerifyOtp";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminManageItems from "./admin/AdminManageItems";
import AdminEditItem from "./admin/AdminEditItem";
import AdminClaimedItems from "./admin/claimedItem";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <Toaster position="top-right" />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Protected User Routes */}
          <Route path="/lost-item" element={<ProtectedRoute><LostItem /></ProtectedRoute>} />
          <Route path="/found-item" element={<ProtectedRoute><FoundItem /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/report-lost" element={<ProtectedRoute><ReportLost /></ProtectedRoute>} />
          <Route path="/report-found" element={<ProtectedRoute><ReportFound /></ProtectedRoute>} />
          <Route path="/item/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
          <Route path="/user/my-claims" element={<ProtectedRoute><MyClaim /></ProtectedRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-items" element={<ProtectedRoute><AdminManageItems /></ProtectedRoute>} />
          <Route path="/admin/items/edit/:id" element={<ProtectedRoute><AdminEditItem /></ProtectedRoute>} />
          <Route path="/admin/claim" element={<ProtectedRoute><AdminClaimedItems /></ProtectedRoute>} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;