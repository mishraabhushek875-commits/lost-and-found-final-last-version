import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LostItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lostItems, lostPagination, fetchLoading, error } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems({ page: 1, status: "lost" }));
  }, [dispatch]);

  const handleNext = () => {
    if (lostPagination.hasNext) {
      dispatch(fetchItems({ page: lostPagination.page + 1, status: "lost" }));
    }
  };

  const handlePrev = () => {
    if (lostPagination.page > 1) {
      dispatch(fetchItems({ page: lostPagination.page - 1, status: "lost" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a3faa] via-[#2558e8] to-[#1e4fd8] px-6 py-14 md:py-20">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Active Reports
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Lost Items
            </h1>
            <p className="mt-3 text-blue-100 text-base md:text-lg max-w-md leading-relaxed">
              Browse reported lost items. Recognize something? Help reunite it with its owner.
            </p>
          </div>

          {/* Stats pill */}
          {!fetchLoading && lostItems?.length > 0 && (
            <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">
              <p className="text-4xl font-black text-white">{lostPagination?.total || lostItems.length}</p>
              <p className="text-blue-200 text-sm font-medium mt-1">Items Reported</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Loading */}
        {fetchLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-100 rounded-full w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !fetchLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-2xl">⚠️</div>
            <p className="text-red-500 font-semibold text-lg">Something went wrong</p>
            <p className="text-gray-400 text-sm">{String(error)}</p>
            {toast.error(error)}
          </div>
        )}

        {!fetchLoading && !error && (
          <>
            {/* Empty state */}
            {(!lostItems || lostItems.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 text-4xl">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Lost Items Found</h3>
                <p className="text-gray-400 max-w-sm">No lost items have been reported yet. Check back later or be the first to report.</p>
              </div>
            ) : (
              /* Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lostItems.map((item, idx) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/item/${item._id}`)}
                    className="group cursor-pointer"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Card wrapper with hover effects */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-100">
                      <ItemCard item={item} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {lostItems?.length > 0 && (
              <div className="flex justify-center items-center mt-12 gap-3">
                <button
                  onClick={handlePrev}
                  disabled={lostPagination.page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: lostPagination.pages || 1 }, (_, i) => i + 1).slice(
                    Math.max(0, lostPagination.page - 3),
                    Math.min(lostPagination.pages, lostPagination.page + 2)
                  ).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => dispatch(fetchItems({ page: pg, status: "lost" }))}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                        pg === lostPagination.page
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
                  disabled={!lostPagination.hasNext}
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

export default LostItems;