// src/pages/ItemDetail.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItem, submitClaim } from "../Redux/store/itemsSlice";
import {
  FaTag,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "sonner";

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleItem, loading, error, pendingClaim } = useSelector(
    (state) => state.items,
  );

  const [proof, setProof] = useState("");
  const [proofError, setProofError] = useState("");

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  const handleSubmitClaim = () => {
    if (!proof.trim()) {
      setProofError("Proof is required");
      toast.error("Proof is required");
      return;
    }

    if (proof.trim().length < 50) {
      setProofError("Proof must be at least 50 characters long");
      toast.error("Proof must be at least 50 characters long");
      return;
    }

    setProofError("");
    dispatch(submitClaim({ proof, id }));
    setProof("");
  };

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading item...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error: {String(error)}</p>
    );
  if (!singleItem)
    return <p className="text-gray-600 text-center mt-10">No item found.</p>;

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft /> Back to Found Items
      </button>

      {/* Title */}
      <h2 className="text-5xl font-bold mb-7 text-gray-800 text-center">
        {singleItem.title}
      </h2>

      <div className="flex justify-evenly items-center m-7">
        {/* Image */}
        {singleItem.images && singleItem.images.length > 0 ? (
          <img
            src={singleItem.images[0]}
            alt={singleItem.title}
            className="w-full max-w-3xl h-72 object-cover rounded mb-6"
          />
        ) : (
          <div className="w-full max-w-3xl h-72 bg-gray-200 flex items-center justify-center rounded mb-6">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3 text-gray-700 text-base">
          <p className="flex items-center gap-2">
            <FaTag className="text-blue-500" /> <strong>Category:</strong>{" "}
            {singleItem.category}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-green-500" /> <strong>Status:</strong>{" "}
            {singleItem.status} ({singleItem.itemStatus})
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-purple-500" /> <strong>Posted By:</strong>{" "}
            {singleItem.postedBy?.name} ({singleItem.postedBy?.email})
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />{" "}
            <strong>Created:</strong>{" "}
            {new Date(singleItem.createdAt).toLocaleString()}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-red-500" /> <strong>Expires:</strong>{" "}
            {new Date(singleItem.expiryDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 mt-6">{singleItem.description}</p>

      {/* Claim Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Submit Claim Proof</h3>
        <div className="flex gap-3">
          <textarea
            value={proof}
            onChange={(e) => {
              setProof(e.target.value);
              setProofError("");
            }}
            placeholder="Enter detailed proof (minimum 50 characters)..."
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={handleSubmitClaim}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Submit Claim
          </button>
        </div>

        {/* Showing claim response */}
        {pendingClaim && pendingClaim.message && (
          <p className="text-green-600 mt-4">{pendingClaim.message}</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
