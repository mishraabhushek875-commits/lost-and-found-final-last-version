import React from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminUsers.css";

const AdminUsers = () => {
  return (
    <div className="admin-users">
      <AdminNavbar />
      <div className="p-6">
        <h2>User Management</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U001</td>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
