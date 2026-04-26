import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myClaim } from "../Redux/store/itemsSlice";

const BASE_URL = "http://localhost:5000";

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${BASE_URL}/${image.replace(/^\//, "")}`;
};

function ClaimImage({ src, alt }) {
  const [error, setError] = React.useState(false);
  const resolvedSrc = getImageSrc(src);

  if (!resolvedSrc || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <span className="text-blue-200 text-lg">📷</span>
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

const getStatusConfig = (status) => {
  switch (status) {
    case "approved":
      return {
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        dot: "bg-emerald-500",
        label: "Approved",
        icon: "✓",
        glow: "shadow-emerald-100",
        bar: "bg-emerald-500",
        barBg: "bg-emerald-100",
      };
    case "rejected":
      return {
        badge: "bg-red-50 text-red-600 border border-red-200",
        dot: "bg-red-500",
        label: "Rejected",
        icon: "✕",
        glow: "shadow-red-100",
        bar: "bg-red-400",
        barBg: "bg-red-100",
      };
    default:
      return {
        badge: "bg-amber-50 text-amber-700 border border-amber-200",
        dot: "bg-amber-400 animate-pulse",
        label: "Pending",
        icon: "…",
        glow: "shadow-amber-100",
        bar: "bg-amber-400",
        barBg: "bg-amber-100",
      };
  }
};

function MyClaim() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myclaims, myclaimsLoading } = useSelector((state) => state.items);
  const { user, token } = useSelector((state) => state.auth || {});
  const isLoggedIn = !!user || !!token;

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) dispatch(myClaim());
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) return null;

  /* Stats */
  const approved = myclaims?.filter((c) => c.status === "approved").length || 0;
  const rejected = myclaims?.filter((c) => c.status === "rejected").length || 0;
  const pending = myclaims?.filter((c) => !["approved", "rejected"].includes(c.status)).length || 0;

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1940b0] via-[#2558e8] to-[#3b82f6] px-6 py-12 md:py-16">
        <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/[0.06]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />

        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-inner">
              ✔
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white leading-tight">My Claims</h1>
              <p className="text-blue-200 text-sm">Track all your submitted claims</p>
            </div>
            {!myclaimsLoading && myclaims?.length > 0 && (
              <div className="ml-auto bg-white/20 text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
                {myclaims.length} Total
              </div>
            )}
          </div>

          {/* Stats Row */}
          {!myclaimsLoading && myclaims?.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Approved", count: approved, color: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/30" },
                { label: "Pending", count: pending, color: "bg-amber-400/20 text-amber-100 border border-amber-300/30" },
                { label: "Rejected", count: rejected, color: "bg-red-400/20 text-red-100 border border-red-300/30" },
              ].map(({ label, count, color }) => (
                <div key={label} className={`rounded-2xl px-4 py-3 text-center ${color}`}>
                  <p className="text-2xl font-black">{count}</p>
                  <p className="text-xs font-semibold mt-0.5 opacity-80">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-4">

        {/* Loading */}
        {myclaimsLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse flex gap-4 shadow-sm border border-gray-100">
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                  <div className="h-6 bg-gray-100 rounded-full w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!myclaimsLoading && (!myclaims || myclaims.length === 0) && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-24 text-center px-6">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5">📋</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Claims Yet</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              You haven't submitted any claims yet. Browse found items to submit your first claim.
            </p>
            <button
              onClick={() => navigate("/found")}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Browse Found Items
            </button>
          </div>
        )}

        {/* Claims List */}
        {!myclaimsLoading && myclaims?.length > 0 && (
          <div className="space-y-3">
            {myclaims.map((claim, idx) => {
              const item = claim.itemId;
              if (!item) return null;

              const image = item?.images?.length > 0 ? item.images[0] : null;
              const status = getStatusConfig(claim.status);

              return (
                <div
                  key={claim._id}
                  className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex gap-0">

                    {/* Status indicator bar */}
                    <div className={`w-1 flex-shrink-0 ${status.bar}`} />

                    <div className="flex gap-4 p-4 flex-1 items-center">

                      {/* Image */}
                      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <ClaimImage src={image} alt={item?.title || "Item"} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-gray-800 truncate">
                          {item?.title?.trim() || "Unnamed Item"}
                        </h2>

                        <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                          <span className="text-xs">📅</span>
                          <p className="text-xs">
                            {claim.createdAt
                              ? new Date(claim.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric", month: "short", year: "numeric",
                                })
                              : "No date"}
                          </p>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 text-xs font-bold rounded-full ${status.badge}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <span className="text-gray-300 group-hover:text-blue-400 text-sm transition-colors">→</span>
                      </div>
                    </div>
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