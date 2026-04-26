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
  FaShieldAlt,
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
    try {
      dispatch(submitClaim({ proof, id }));
      toast.success("Claim submitted successfully");
    } catch (error) {
      toast.error("Error in submitting claim");
      console.log(error)
    }
    setProof("");
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "lost":
        return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200", label: "LOST" };
      case "found":
        return { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200", label: "FOUND" };
      case "claimed":
        return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200", label: "CLAIMED" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400", border: "border-gray-200", label: status?.toUpperCase() };
    }
  };

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto mb-5 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 font-semibold">Loading item details…</p>
        </div>
      </div>
    );

  /* ── Error ── */
  if (error)
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 shadow-md max-w-sm w-full text-center border-t-4 border-red-500">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-bold text-lg mb-2">Something went wrong</p>
          <p className="text-gray-400 text-sm">{String(error)}</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );

  if (!singleItem)
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-md text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600 font-semibold">No item found.</p>
        </div>
      </div>
    );

  const statusConfig = getStatusConfig(singleItem.status);
  const charCount = proof.length;
  const progress = Math.min((charCount / 50) * 100, 100);

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <span className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <FaArrowLeft className="text-xs" />
            </span>
            Back
          </button>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
            {statusConfig.label}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: Images + Details ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 aspect-video">
              {singleItem.images?.length > 0 ? (
                <img
                  src={singleItem.images[0]}
                  alt={singleItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                  <FaFileAlt className="text-5xl text-blue-200 mb-3" />
                  <span className="text-gray-400 font-medium text-sm">No image available</span>
                </div>
              )}

              {/* Category tag over image */}
              {singleItem.category && (
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <FaTag className="text-[10px]" />
                    {singleItem.category}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                {singleItem.title}
              </h1>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {singleItem.description}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">

              {/* Posted By */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <FaUser className="text-sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Posted By</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">{singleItem.postedBy?.name}</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">{singleItem.postedBy?.email}</p>
              </div>

              {/* Item Status */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-indigo-500 text-sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Item Status</span>
                </div>
                <p className="font-bold text-gray-800 text-sm capitalize">{singleItem.itemStatus || "N/A"}</p>
              </div>

              {/* Posted On */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-sky-500">
                <div className="flex items-center gap-2 mb-3">
                  <FaCalendarAlt className="text-sky-500 text-sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Posted On</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">
                  {new Date(singleItem.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>

              {/* Expiry */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-orange-400">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-orange-400 text-sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Expires On</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">
                  {new Date(singleItem.expiryDate).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Claim Form ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">

              {/* Claim Card */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 pt-7 pb-8 relative overflow-hidden">
                  <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5" />
                  <div className="relative">
                    <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                      <FaShieldAlt className="text-white text-lg" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">Submit a Claim</h3>
                    <p className="text-blue-100 text-sm mt-1">Prove this item belongs to you</p>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-5">

                  {/* Textarea */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Proof of Ownership
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        value={proof}
                        onChange={(e) => {
                          setProof(e.target.value);
                          setProofError("");
                        }}
                        placeholder="Describe how this item is yours — unique marks, where you lost it, what was inside…"
                        rows={6}
                        className={`w-full border-2 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 resize-none transition-all focus:outline-none ${
                          proofError
                            ? "border-red-300 focus:border-red-400 bg-red-50"
                            : charCount >= 50
                            ? "border-emerald-300 focus:border-emerald-400 bg-emerald-50/30"
                            : "border-gray-200 focus:border-blue-400 bg-gray-50"
                        }`}
                      />
                    </div>

                    {/* Character progress bar */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            progress >= 100 ? "bg-emerald-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${charCount >= 50 ? "text-emerald-600" : "text-gray-400"}`}>
                        {charCount}/50
                      </span>
                    </div>
                  </div>

                  {/* Error */}
                  {proofError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl font-medium">
                      ⚠ {proofError}
                    </div>
                  )}

                  {/* Success */}
                  {pendingClaim?.message && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl font-medium flex items-center gap-2">
                      <FaCheckCircle />
                      {pendingClaim.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitClaim}
                    disabled={charCount < 50}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Submit Claim
                  </button>

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                    <FaShieldAlt className="text-blue-300" />
                    All claims are reviewed carefully
                  </div>
                </div>
              </div>

              {/* Expiry warning banner */}
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-orange-500 text-sm" />
                </div>
                <div>
                  <p className="text-orange-700 font-bold text-sm">Claim before it expires</p>
                  <p className="text-orange-500 text-xs mt-0.5">
                    Expires {new Date(singleItem.expiryDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
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