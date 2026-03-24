import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myClaim } from "../Redux/store/itemsSlice";

// ✅ Apna backend base URL yahan daalo
const BASE_URL = "http://localhost:5000";

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${BASE_URL}/${image.replace(/^\//, "")}`;
};

function ClaimImage({ src, alt }) {
  const [error, setError] = useState(false);
  const resolvedSrc = getImageSrc(src);

  if (!resolvedSrc || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case "approved":
      return { badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-500", label: "Approved" };
    case "rejected":
      return { badge: "bg-red-50 text-red-700 ring-1 ring-red-200", dot: "bg-red-500", label: "Rejected" };
    default:
      return { badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", dot: "bg-amber-400", label: "Pending" };
  }
};

function MyClaim() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myclaims, myclaimsLoading } = useSelector((state) => state.items);

  // ─────────────────────────────────────────────
  // ✅ AUTH CHECK — Teen methods, jo match kare use karo
  // ─────────────────────────────────────────────

  // METHOD 1: Redux store mein user/token hai
  const { user, token } = useSelector((state) => state.auth || {});
  const isLoggedIn = !!user || !!token;

  // METHOD 2: localStorage mein token hai (uncomment karo agar use karo)
  // const isLoggedIn = !!localStorage.getItem("token");

  // METHOD 3: localStorage mein user object hai (uncomment karo agar use karo)
  // const isLoggedIn = !!localStorage.getItem("user");

  // ─────────────────────────────────────────────

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // ✅ Login page par redirect
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(myClaim());
    }
  }, [dispatch, isLoggedIn]);

  // Agar logged out hai toh kuch render mat karo
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-4">

        {/* ── Header ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Claims</h1>
              <p className="text-sm text-gray-400 mt-0.5">Track all your submitted claims</p>
            </div>
            {!myclaimsLoading && myclaims?.length > 0 && (
              <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                {myclaims.length} Total
              </span>
            )}
          </div>
        </div>

        {/* ── Loading Skeleton ── */}
        {myclaimsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 animate-pulse shadow-sm">
                <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-6 bg-gray-100 rounded-full w-1/4 mt-2" />
                </div>
              </div>
            ))}
          </div>

        ) : !myclaims || myclaims.length === 0 ? (

          /* ── Empty State ── */
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 flex flex-col items-center gap-3 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
              </svg>
            </div>
            <p className="text-gray-500 font-semibold">No Claims Found</p>
            <p className="text-sm text-gray-400">You haven't submitted any claims yet.</p>
          </div>

        ) : (

          /* ── Claims List ── */
          <div className="space-y-3">
            {myclaims.map((claim) => {
              const status = getStatusStyle(claim.status);
              return (
                <div
                  key={claim._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shrink-0">
                      <ClaimImage src={claim.image} alt={claim.itemName || "Item"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-semibold text-gray-900 truncate">
                        {claim.itemName || "Unnamed Item"}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric",
                            })
                          : "No date"}
                      </p>
                      <span className={`inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 text-xs font-semibold rounded-full ${status.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyClaim;