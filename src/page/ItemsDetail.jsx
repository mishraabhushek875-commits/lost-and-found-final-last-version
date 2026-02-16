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
  FaCheckCircle,
  FaFileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "sonner";

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleItem, loading, error, pendingClaim } = useSelector(
    (state) => state.items
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "lost":
        return "bg-red-100 text-red-800 border border-red-300";
      case "found":
        return "bg-green-100 text-green-800 border border-green-300";
      case "claimed":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading item details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
          <p className="text-red-600 text-lg font-semibold">Error: {String(error)}</p>
        </div>
      </div>
    );

  if (!singleItem)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-600 text-lg font-medium">No item found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors font-semibold text-lg group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Items
        </button>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Image */}
          <div className="lg:col-span-2">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white mb-8 group">
              {singleItem.images && singleItem.images.length > 0 ? (
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={singleItem.images[0]}
                    alt={singleItem.title}
                    className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getStatusColor(singleItem.status)}`}>
                      <FaCheckCircle size={16} />
                      {singleItem.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <FaFileAlt className="text-5xl text-slate-400 mx-auto mb-3" />
                    <span className="text-slate-500 font-medium">No image available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                {singleItem.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {singleItem.description}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Category Card */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaTag className="text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-semibold uppercase">Category</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{singleItem.category}</p>
              </div>

              {/* Item Status Card */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaClock className="text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-semibold uppercase">Item Status</span>
                </div>
                <p className="text-lg font-bold text-gray-900 capitalize">{singleItem.itemStatus}</p>
              </div>

              {/* Posted By Card */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-semibold uppercase">Posted By</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{singleItem.postedBy?.name}</p>
                <p className="text-sm text-gray-500">{singleItem.postedBy?.email}</p>
              </div>

              {/* Created Date Card */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-semibold uppercase">Posted On</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{new Date(singleItem.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Claim Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <FaFileAlt size={20} />
                  <h3 className="text-2xl font-bold">Submit Claim</h3>
                </div>
                <p className="text-blue-100 text-sm">Provide proof to claim this item</p>
              </div>

              {/* Form Body */}
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Proof of Ownership <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={proof}
                    onChange={(e) => {
                      setProof(e.target.value);
                      setProofError("");
                    }}
                    placeholder="Describe how you can prove this is your item (minimum 50 characters)..."
                    rows={6}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder-gray-500 transition-all resize-none"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    {proof.length} / 50+ characters required
                  </div>
                </div>

                {/* Error Message */}
                {proofError && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-red-700 font-medium text-sm">{proofError}</p>
                  </div>
                )}

                {/* Success Message */}
                {pendingClaim && pendingClaim.message && (
                  <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-green-700 font-medium text-sm flex items-center gap-2">
                      <FaCheckCircle /> {pendingClaim.message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmitClaim}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Submit Claim
                </button>

                {/* Expires Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                    <FaClock />
                    Expires On
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(singleItem.expiryDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Claim before expiry date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;