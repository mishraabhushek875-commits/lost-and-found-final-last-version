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
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "sonner";

const AdminClaimedItems = () => {
  const dispatch = useDispatch();
  const { claims = [], loading, error } = useSelector(
    (state) => state.admin
  );

useEffect(() => {
  dispatch(claimedItems()).then((res) => {
    console.log("CLAIM DATA:", res.payload);
  });
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
          console.error(err);
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
          console.error(err);
        });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <FaCheckCircle />;
      case "rejected":
        return <FaTimesCircle />;
      default:
        return <FaClock />;
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AdminNavbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Claims</h1>

        {error && (
          <div className="bg-red-500/20 p-3 mb-4">
            <FaExclamationCircle /> {error}
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="hidden md:block bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-3">Student ID</th>
                <th className="p-3">Number</th> {/* ✅ NEW */}
                <th className="p-3">Item</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Proof</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-6">
                    No claims
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
                  <tr key={claim._id} className="border-t border-slate-700">

                    <td className="p-3">
                      {claim.claimedBy?.studentId || "N/A"}
                    </td>

                    {/* ✅ NUMBER */}
                    <td className="p-3">
                      {claim.claimedBy?.phone || "N/A"}
                    </td>

                    <td className="p-3">
                      {claim.itemId?.title}
                    </td>

                    <td className="p-3">
                      {claim.claimedBy?.name}
                    </td>

                    <td className="p-3">
                      {claim.claimedBy?.email}
                    </td>

                    <td className="p-3 max-w-xs truncate">
                      {claim.proof || "No proof"}
                    </td>

                    <td className="p-3 flex items-center gap-2">
                      {getStatusIcon(claim.status)}
                      <span className={getStatusColor(claim.status)}>
                        {claim.status || "Pending"}
                      </span>
                    </td>

                    <td className="p-3">
                      {(!claim.status || claim.status === "pending") && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(claim._id)}
                            className="bg-green-600 px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(claim._id)}
                            className="bg-red-600 px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {claims.map((claim) => (
            <div key={claim._id} className="bg-slate-800 p-4 rounded-lg">

              <p><b>Student ID:</b> {claim.claimedBy?.studentId}</p>
              <p><b>Number:</b> {claim.claimedBy?.phone}</p> {/* ✅ */}
              <p><b>Item:</b> {claim.itemId?.title}</p>
              <p><b>Name:</b> {claim.claimedBy?.name}</p>
              <p><b>Email:</b> {claim.claimedBy?.email}</p>
              <p><b>Proof:</b> {claim.proof}</p>

              <p className="mt-2">
                <b>Status:</b> {claim.status || "Pending"}
              </p>

              {(!claim.status || claim.status === "pending") && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApprove(claim._id)}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(claim._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClaimedItems;