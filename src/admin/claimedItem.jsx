import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimedItems,
  approveClaim,
  rejectClaim,
} from "../Redux/store/adminSlice";
import AdminNavbar from "./AdminNavbar";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBoxes,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "sonner";

const AdminClaimedItems = () => {
  const dispatch = useDispatch();
  const { claims = [], loading, error, pagination = {} } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(claimedItems());
  }, [dispatch]);

  const handleApprove = (id) => {
    if (window.confirm("Approve this claim?")) {
      dispatch(approveClaim(id))
        .unwrap()
        .then(() => {
          toast.success("Claim approved successfully");
          dispatch(claimedItems());
        })
        .catch((err) => {
          toast.error("Failed to approve claim");
          console.error("Approve failed:", err);
        });
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Reject this claim?")) {
      dispatch(rejectClaim(id))
        .unwrap()
        .then(() => {
          toast.success("Claim rejected successfully");
          dispatch(claimedItems());
        })
        .catch((err) => {
          toast.error("Failed to reject claim");
          console.error("Reject failed:", err);
        });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <FaCheckCircle className="text-green-400" />;
      case "rejected":
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-amber-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Loading claims...</p>
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaCheckCircle className="text-green-400 text-3xl" />
            <h1 className="text-5xl font-extrabold text-white">Pending Claims</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Review and manage item claims submitted by users.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-500/20 border-l-4 border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-semibold flex items-center gap-2">
              <FaExclamationCircle /> Error: {error}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Head */}
                <thead>
                  <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-left border-b border-slate-600">
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Claim ID
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Claimed By
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-600">
                  {claims.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        <div className="flex flex-col items-center">
                          <FaBoxes className="text-4xl text-slate-500 mb-3" />
                          <p className="text-lg font-medium">No pending claims</p>
                          <p className="text-sm">
                            There are no claims to review at this time.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    claims.map((claim) => (
                      <tr
                        key={claim._id}
                        className="hover:bg-slate-600/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 text-sm text-slate-300 font-mono truncate">
                          {claim._id?.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 text-white font-semibold max-w-xs truncate">
                          {claim.itemId?.title || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-slate-300 font-medium">
                          {claim.claimedBy?.name || "Unknown User"}
                        </td>
                        <td className="px-6 py-4 text-slate-300 truncate">
                          {claim.claimedBy?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(claim.status)}
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${getStatusColor(
                                claim.status
                              )}`}
                            >
                              {claim.status || "Pending"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {(!claim.status || claim.status?.toLowerCase() === "pending") && (
                              <>
                                <button
                                  className="group/btn px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                                  onClick={() => handleApprove(claim._id)}
                                  title="Approve this claim"
                                >
                                  <FaCheckCircle size={16} />
                                  <span className="hidden sm:inline">Approve</span>
                                </button>
                                <button
                                  className="group/btn px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                                  onClick={() => handleReject(claim._id)}
                                  title="Reject this claim"
                                >
                                  <FaTimesCircle size={16} />
                                  <span className="hidden sm:inline">Reject</span>
                                </button>
                              </>
                            )}
                            {claim.status && claim.status?.toLowerCase() !== "pending" && (
                              <span className="text-slate-400 text-sm italic">
                                {claim.status}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination?.pages && claims.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 px-4">
            <button
              disabled={pagination.page === 1}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              onClick={() => {
                // dispatch(claimedItems({ page: pagination.page - 1 }));
              }}
            >
              <FaChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <p className="text-white text-lg font-semibold">
                Page{" "}
                <span className="text-blue-400">{pagination.page}</span> of{" "}
                <span className="text-blue-400">{pagination.pages}</span>
              </p>
              <p className="text-slate-400 text-sm">
                Showing {claims.length} claims
              </p>
            </div>

            <button
              disabled={!pagination.hasNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              onClick={() => {
                // dispatch(claimedItems({ page: pagination.page + 1 }));
              }}
            >
              <span>Next</span>
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClaimedItems;
