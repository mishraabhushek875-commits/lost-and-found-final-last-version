import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import { deleteItem } from "../Redux/store/adminSlice";
import { useNavigate } from "react-router";
import {
  FaEdit,
  FaTrashAlt,
  FaBoxes,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "sonner";

const AdminManageItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Fix 2: use fetchLoading (matches slice), aliased as `loading`
  const { items, pagination, error, fetchLoading: loading } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems({ page: 1 }));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? This action cannot be undone."
      )
    ) {
      dispatch(deleteItem(id))
        .unwrap()
        .then(() => {
          toast.success("Item deleted successfully");
          // ✅ Fix 1: use `pagination` from Redux state instead of undefined `data`
          dispatch(fetchItems({ page: pagination.page }));
        })
        .catch((err) => {
          toast.error("Failed to delete item");
          console.error("Delete failed:", err);
        });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "lost":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "found":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "claimed":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNavbar />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaBoxes className="text-blue-400 text-3xl" />
            <h1 className="text-5xl font-extrabold text-white">Manage Items</h1>
          </div>
          <p className="text-slate-400 text-lg">
            View, edit, or delete lost and found items from your system.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-500/20 border-l-4 border-red-500 rounded-lg p-4">
            <p className="text-red-200 font-semibold flex items-center gap-2">
              <FaExclamationCircle /> Error: {error}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Head */}
                <thead>
                  <tr className="bg-gradient-to-r from-slate-600 to-slate-700 text-left border-b border-slate-600">
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Item ID
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-600">
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        <div className="flex flex-col items-center">
                          <FaBoxes className="text-4xl text-slate-500 mb-3" />
                          <p className="text-lg font-medium">No items found</p>
                          <p className="text-sm">
                            There are no items to manage yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-600/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 text-sm text-slate-300 font-mono truncate">
                          {item._id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 text-white font-semibold max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium capitalize border border-blue-500/30">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="group/btn px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                              onClick={() =>
                                navigate(`/admin/items/edit/${item._id}`)
                              }
                              title="Edit this item"
                            >
                              <FaEdit size={16} />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              className="group/btn px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
                              onClick={() => handleDelete(item._id)}
                              title="Delete this item"
                            >
                              <FaTrashAlt size={16} />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && items.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 px-4">
            <button
              disabled={pagination.page === 1}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              onClick={() =>
                dispatch(fetchItems({ page: pagination.page - 1 }))
              }
            >
              <FaChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <p className="text-white text-lg font-semibold">
                Page{" "}
                <span className="text-blue-400">{pagination.page}</span> of{" "}
                <span className="text-blue-400">{pagination.pages}</span>
              </p>
              <p className="text-slate-400 text-sm">
                Showing {items.length} items
              </p>
            </div>

            {/* ✅ Fix 3: disabled when hasNext is FALSE (no more pages) */}
            <button
              disabled={!pagination.hasNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              onClick={() =>
                dispatch(fetchItems({ page: pagination.page + 1 }))
              }
            >
              <span>Next</span>
              <FaChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageItems;