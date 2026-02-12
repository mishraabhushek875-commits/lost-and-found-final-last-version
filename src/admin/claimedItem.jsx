import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimedItems,
  approveClaim,
  rejectClaim,
} from "../Redux/store/adminSlice";
import AdminNavbar from "./AdminNavbar";

const AdminClaimedItems = () => {
  const dispatch = useDispatch();
  const { claims = [], loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(claimedItems());
  }, [dispatch]);

  const handleApprove = (id) => {
    if (window.confirm("Approve this claim?")) {
      dispatch(approveClaim(id))
        .unwrap()
        .then(() => dispatch(claimedItems())); // refresh list
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Reject this claim?")) {
      dispatch(rejectClaim(id))
        .unwrap()
        .then(() => dispatch(claimedItems())); // refresh list
    }
  };

  return (
    <div className="admin-claimed-items">
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Pending Claims</h2>
        <p>Here you can approve or reject claims submitted by users.</p>

        {loading && <p className="text-gray-500">Loading claims...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Claim ID</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Claimed By</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No pending claims
                    </td>
                  </tr>
                ) : (
                  claims.map((claim) => (
                    <tr key={claim._id}>
                      <td className="p-3">{claim._id}</td>
                      <td className="p-3">{claim.itemId?.title}</td>
                      <td className="p-3">
                        {claim.claimedBy?.name} ({claim.claimedBy?.email})
                      </td>
                      <td className="p-3 capitalize">{claim.status}</td>
                      <td className="p-3 space-x-2">
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(claim._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(claim._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClaimedItems;
