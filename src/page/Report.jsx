import React from "react";
import { Link } from "react-router-dom";
import "./Report.css";
import { FaSearch, FaExclamationTriangle } from "react-icons/fa";

const Report = () => {
  return (
    <div className="report-container text-black">
      <h1 className="report-title">Report an Item</h1>
      <p className="report-subtitle">
        Choose whether you want to report a lost item or a found item.
      </p>

      <div className="report-options">
        <Link to="/report-lost" className="report-card lost-card">
          <FaExclamationTriangle className="report-icon" />
          <h2>Report Lost Item</h2>
          <p>If you lost something, submit details here.</p>
        </Link>

        <Link to="/report-found" className="report-card found-card">
          <FaSearch className="report-icon" />
          <h2>Report Found Item</h2>
          <p>Found something? Help return it to the owner.</p>
        </Link>
      </div>
    </div>
  );
};

export default Report;
