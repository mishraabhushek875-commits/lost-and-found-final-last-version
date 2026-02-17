import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FoundItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, pagination, loading, error } = useSelector((state) => state.items);


  useEffect(() => {
    dispatch(fetchItems({ page: 1 }));
    console.log(items);

  }, [dispatch]);

  const handleNext = () => {
    if (pagination.hasNext) {
      dispatch(fetchItems({ page: pagination.page + 1 }));
    }
  };

  const handlePrev = () => {
    if (pagination.page > 1) {
      dispatch(fetchItems({ page: pagination.page - 1 }));
    }
  };

  return (
    <div className="page px-6 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Found Items
      </h2>

      {loading && (
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

      {!loading && !error && (
        <>
          {items.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              No found items reported yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/item/${item._id}`)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200 "
                >
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              disabled={pagination.page === 1}
              className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 font-medium">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={handleNext}
              disabled={!pagination.hasNext}
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

export default FoundItems;
