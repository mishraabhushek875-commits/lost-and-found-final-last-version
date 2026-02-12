import React from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminViews.css';

const AdminViews = () => {
  return (
    <div className="admin-views">
      <AdminNavbar />
      <div className="p-6">
        <h2>Item Views</h2>
        <p>Track which items are being viewed most frequently.</p>
        <ul>
          <li>Wallet - 120 views</li>
          <li>Phone - 95 views</li>
          <li>Backpack - 80 views</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminViews;
