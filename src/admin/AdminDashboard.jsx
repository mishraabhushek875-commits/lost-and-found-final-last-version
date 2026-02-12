import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../Redux/store/adminSlice";

const AdminDashboard = () => {
  const { data, error, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const { stats, recentItems, recentClaims, categoryStats } = data || {};

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

        {loading && <p className="text-gray-500">Loading dashboard...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && stats && (
          <>
            {/* Stats Grid */}
            <div className="dashboard-grid mb-8">
              <div className="dashboard-card">
                <h3>Total Items</h3>
                <p>{stats.totalItems}</p>
              </div>
              <div className="dashboard-card">
                <h3>Lost Items</h3>
                <p>{stats.lostItems}</p>
              </div>
              <div className="dashboard-card">
                <h3>Found Items</h3>
                <p>{stats.foundItems}</p>
              </div>
              <div className="dashboard-card">
                <h3>Pending Claims</h3>
                <p>{stats.pendingClaims}</p>
              </div>
              <div className="dashboard-card">
                <h3>Approved Claims</h3>
                <p>{stats.approvedClaims}</p>
              </div>
              <div className="dashboard-card">
                <h3>Resolved Items</h3>
                <p>{stats.resolvedItems}</p>
              </div>
              <div className="dashboard-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
            </div>

            {/* Recent Items */}
            <h3 className="text-xl font-semibold mb-2">Recent Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {recentItems?.map((item) => (
                <div key={item._id} className="dashboard-card">
                  <img
                    src={item.images[0] || "/placeholder.png"}
                    alt={item.title}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs text-gray-500">
                    Status: {item.status} | Posted by: {item.postedBy?.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Claims */}
            <h3 className="text-xl font-semibold mb-2">Recent Claims</h3>
            <ul className="space-y-2 mb-8">
              {recentClaims?.map((claim) => (
                <li key={claim._id} className="dashboard-card p-3">
                  <p>
                    <strong>{claim.claimedBy?.name}</strong> claimed{" "}
                    <em>{claim.itemId?.title}</em>
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {claim.status}
                  </p>
                  <p className="text-xs text-gray-500">Proof: {claim.proof}</p>
                </li>
              ))}
            </ul>

            {/* Category Stats */}
            <h3 className="text-xl font-semibold mb-2">Category Stats</h3>
            <div className="dashboard-grid">
              {categoryStats?.map((cat) => (
                <div key={cat._id} className="dashboard-card">
                  <h4 className="font-bold capitalize">{cat._id}</h4>
                  <p>{cat.count}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
