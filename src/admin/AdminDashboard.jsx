import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../Redux/store/adminSlice";
import {
  FaBoxes,
  FaFileAlt,
  FaCheckCircle,
  FaUsers,
  FaClipboardCheck,
  FaHourglassEnd,
  FaCheckDouble,
  FaUndo,
  FaChartBar
} from "react-icons/fa";

const AdminDashboard = () => {
  const { data, error, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const { stats, recentItems, recentClaims, categoryStats } = data || {};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="bg-red-500 bg-opacity-20 border-l-4 border-red-500 p-8 rounded-lg max-w-md">
            <p className="text-red-200 font-semibold text-lg">Error loading dashboard</p>
            <p className="text-red-100 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNavbar />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back! Here's your system overview.</p>
        </div>

        {!loading && !error && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total Items */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-semibold mb-1">Total Items</p>
                    <p className="text-4xl font-bold">{stats.totalItems}</p>
                  </div>
                  <FaBoxes size={40} className="text-blue-200 opacity-80" />
                </div>
              </div>

              {/* Lost Items */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-semibold mb-1">Lost Items</p>
                    <p className="text-4xl font-bold">{stats.lostItems}</p>
                  </div>
                  <FaFileAlt size={40} className="text-red-200 opacity-80" />
                </div>
              </div>

              {/* Found Items */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-semibold mb-1">Found Items</p>
                    <p className="text-4xl font-bold">{stats.foundItems}</p>
                  </div>
                  <FaCheckCircle size={40} className="text-green-200 opacity-80" />
                </div>
              </div>

              {/* Total Users */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-semibold mb-1">Total Users</p>
                    <p className="text-4xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <FaUsers size={40} className="text-purple-200 opacity-80" />
                </div>
              </div>
            </div>

            {/* Claims Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Pending Claims */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-semibold mb-1">Pending Claims</p>
                    <p className="text-4xl font-bold">{stats.pendingClaims}</p>
                  </div>
                  <FaHourglassEnd size={40} className="text-amber-200 opacity-80" />
                </div>
              </div>

              {/* Approved Claims */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sky-100 text-sm font-semibold mb-1">Approved Claims</p>
                    <p className="text-4xl font-bold">{stats.approvedClaims}</p>
                  </div>
                  <FaCheckDouble size={40} className="text-sky-200 opacity-80" />
                </div>
              </div>

              {/* Resolved Items */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm font-semibold mb-1">Resolved Items</p>
                    <p className="text-4xl font-bold">{stats.resolvedItems}</p>
                  </div>
                  <FaUndo size={40} className="text-teal-200 opacity-80" />
                </div>
              </div>
            </div>

            {/* Recent Items */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <FaBoxes className="text-blue-400 text-2xl" />
                <h2 className="text-3xl font-bold text-white">Recent Items</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentItems && recentItems.length > 0 ? (
                  recentItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                      <div className="relative overflow-hidden bg-slate-600 h-48">
                        <img
                          src={item.images?.[0] || "/placeholder.png"}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === "lost"
                              ? "bg-red-500 text-white"
                              : item.status === "found"
                                ? "bg-green-500 text-white"
                                : "bg-blue-500 text-white"
                            }`}>
                            {item.status?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-white text-lg mb-2 truncate">
                          {item.title}
                        </h4>
                        <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span className="font-semibold">{item.category}</span>
                          <span>By: {item.postedBy?.name}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-slate-400 py-12">
                    <p>No recent items found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Claims */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <FaClipboardCheck className="text-green-400 text-2xl" />
                <h2 className="text-3xl font-bold text-white">Recent Claims</h2>
              </div>
              <div className="bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Claimed By</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Item</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Proof</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {recentClaims && recentClaims.length > 0 ? (
                        recentClaims.map((claim) => (
                          <tr key={claim._id} className="hover:bg-slate-600 transition-colors">
                            <td className="px-6 py-4 text-white font-medium">
                              {claim.claimedBy?.name}
                            </td>
                            <td className="px-6 py-4 text-slate-300">
                              {claim.itemId?.title}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${claim.status === "pending"
                                  ? "bg-amber-500 text-white"
                                  : claim.status === "approved"
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }`}>
                                {claim.status?.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-300 text-sm truncate max-w-xs">
                              {claim.proof}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                            No recent claims found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Category Stats */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaChartBar className="text-yellow-400 text-2xl" />
                <h2 className="text-3xl font-bold text-white">Category Stats</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryStats && categoryStats.length > 0 ? (
                  categoryStats.map((cat) => (
                    <div
                      key={cat._id}
                      className="bg-slate-700 rounded-xl p-4 text-center hover:bg-slate-600 transition-colors"
                    >
                      <h4 className="font-bold text-white capitalize mb-2 line-clamp-2">
                        {cat._id}
                      </h4>
                      <p className="text-3xl font-extrabold text-blue-400">{cat.count}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-slate-400 py-8">
                    No category data available
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
