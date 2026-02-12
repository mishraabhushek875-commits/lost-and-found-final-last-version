import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminReports.css";
import { getReports, updateReportStatus } from "../utils/storage";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  // Load all reports from localStorage
  useEffect(() => {
    const data = getReports();
    setReports(data);
  }, []);

  // Handle Approve / Reject
  const handleStatusChange = (id, status) => {
    updateReportStatus(id, status);

    // Update UI
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="admin-reports">
      <AdminNavbar />

      <div className="p-6">
        <h2>Submitted Reports</h2>

        {reports.length === 0 && <p>No reports found.</p>}

        {reports.length > 0 && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.type}</td>
                    <td>{report.itemName}</td>
                    <td>{report.description}</td>
                    <td>{report.contact}</td>
                    <td>{report.status || "Pending"}</td>

                    <td>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          handleStatusChange(report.id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleStatusChange(report.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
