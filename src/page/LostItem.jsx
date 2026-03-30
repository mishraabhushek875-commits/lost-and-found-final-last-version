import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LostItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ items → lostItems (alag array se aayega)
  const { lostItems, lostPagination, fetchLoading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ page: 1, status: "lost" }));
  }, [dispatch]);
  // ✅ debug useEffect hatao

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
    <div className="page px-6 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Lost Items
      </h2>

      {fetchLoading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 animate-pulse">Loading items...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500 font-medium">Error: {error}</p>
          {toast.error(error)}
        </div>
      )}

      {!fetchLoading && !error && (
        <>
          {lostItems.length === 0 ? ( // ✅ lostItems
            <p className="text-gray-600 text-center mt-10">
              No lost items reported yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lostItems.map((item) => ( // ✅ lostItems
                <div
                  key={item._id}
                  onClick={() => navigate(`/item/${item._id}`)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              disabled={lostPagination.page === 1}
              className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 font-medium">
              Page {lostPagination.page} of {lostPagination.pages}
            </span>
            <button
              onClick={handleNext}
              disabled={!lostPagination.hasNext}
              className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LostItems;