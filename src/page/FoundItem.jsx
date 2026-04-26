import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FoundItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { foundItems, foundPagination, fetchLoading, error } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems({ page: 1, status: "found" }));
  }, [dispatch]);

  const handleNext = () => {
    if (foundPagination.hasNext) {
      dispatch(fetchItems({ page: foundPagination.page + 1, status: "found" }));
    }
  };

  const handlePrev = () => {
    if (foundPagination.page > 1) {
      dispatch(fetchItems({ page: foundPagination.page - 1, status: "found" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d3875] via-[#1a56c4] to-[#2563eb] px-6 py-14 md:py-20">

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-10 right-0 w-80 h-80 rounded-full bg-white/[0.06]" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-300/10" />
        <div className="pointer-events-none absolute top-6 left-1/3 w-3 h-3 rounded-full bg-white/30" />
        <div className="pointer-events-none absolute bottom-8 right-1/4 w-2 h-2 rounded-full bg-white/40" />
        <div className="pointer-events-none absolute top-1/2 right-10 w-5 h-5 rounded-full bg-white/10" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Available to Claim
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Found Items
            </h1>
            <p className="mt-3 text-blue-100 text-base md:text-lg max-w-md leading-relaxed">
              Items found and waiting for their rightful owner. Is one of these yours?
            </p>
          </div>

          {/* Stats */}
          {!fetchLoading && foundItems?.length > 0 && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">
                <p className="text-4xl font-black text-white">{foundPagination?.total || foundItems.length}</p>
                <p className="text-blue-200 text-sm font-medium mt-1">Items Found</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z" fill="#F0F4FF"/>
          </svg>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Loading Skeleton */}
        {fetchLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-50" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-6 bg-blue-50 rounded-full w-20" />
                    <div className="h-6 bg-gray-100 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !fetchLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl">⚠️</div>
            <p className="text-red-500 font-bold text-lg">Something went wrong</p>
            <p className="text-gray-400 text-sm">{String(error)}</p>
            {toast.error(error)}
          </div>
        )}

        {!fetchLoading && !error && (
          <>
            {/* Empty state */}
            {(!foundItems || foundItems.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 text-4xl">📦</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Found Items Yet</h3>
                <p className="text-gray-400 max-w-sm">Nobody has reported a found item yet. If you found something, be a hero and report it!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundItems.map((item, idx) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/item/${item._id}`)}
                    className="cursor-pointer"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-100 group">
                      <ItemCard item={item} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {foundItems?.length > 0 && (
              <div className="flex justify-center items-center mt-12 gap-3 flex-wrap">
                <button
                  onClick={handlePrev}
                  disabled={foundPagination.page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {Array.from({ length: foundPagination.pages || 1 }, (_, i) => i + 1).slice(
                    Math.max(0, foundPagination.page - 3),
                    Math.min(foundPagination.pages, foundPagination.page + 2)
                  ).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => dispatch(fetchItems({ page: pg, status: "found" }))}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                        pg === foundPagination.page
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {pg}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!foundPagination.hasNext}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoundItems;