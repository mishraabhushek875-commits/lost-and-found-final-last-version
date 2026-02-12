import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="nav-container">
        <Link to="/admin/dashboard" className="logo">AdminPanel</Link>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-items">Manage Items</Link></li>
          <li><Link to="/admin/view-reports">Reports</Link></li>
          <li><Link to="/admin/users">Users</Link></li>

          <li>
            <Link to="/admin/views" className="nav-link">
              Views
            </Link>
          </li>
          <li><Link to="/">Back to Site</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;