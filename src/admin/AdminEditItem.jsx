import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem } from "../Redux/store/adminSlice";
import AdminNavbar from "./AdminNavbar";
import { FaArrowLeft, FaEdit, FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "sonner";

const AdminEditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.items);

  const existingItem = data?.items?.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    status: "lost",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingItem) {
      setFormData({
        title: existingItem.title,
        description: existingItem.description,
        category: existingItem.category,
        status: existingItem.status,
      });
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
    if (formData.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateItem({ id, updatedData: formData })).unwrap();
      toast.success("Item updated successfully!");
      setTimeout(() => navigate("/admin/manage-items"), 1500);
    } catch (err) {
      toast.error("Failed to update item");
      console.error("Update failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Loading item...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!existingItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <AdminNavbar />
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="max-w-md mx-auto bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-center gap-3 text-red-200">
              <FaExclamationTriangle size={24} />
              <div>
                <p className="font-bold text-lg">Item Not Found</p>
                <p className="text-sm mt-1">The item you're trying to edit doesn't exist.</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/manage-items")}
              className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Go Back to Items
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNavbar />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/manage-items")}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors font-semibold group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Manage Items
        </button>

        {/* Main Container */}
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-slate-700 rounded-2xl shadow-2xl p-8 border border-slate-600">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FaEdit className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Edit Item</h1>
                <p className="text-slate-400 text-sm mt-1">Update item details</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 mb-8"></div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  Item Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter item title..."
                  className={`w-full px-4 py-3 bg-slate-600 text-white rounded-lg placeholder-slate-400 border-2 transition-all ${errors.title
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    } focus:ring-2 focus:outline-none`}
                />
                {errors.title && (
                  <p className="mt-2 text-red-400 text-sm font-medium flex items-center gap-1">
                    <FaTimes size={14} /> {errors.title}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed description..."
                  rows="5"
                  className={`w-full px-4 py-3 bg-slate-600 text-white rounded-lg placeholder-slate-400 border-2 transition-all resize-none ${errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-slate-500 focus:border-blue-500 focus:ring-blue-500/50"
                    } focus:ring-2 focus:outline-none`}
                />
                {errors.description && (
                  <p className="mt-2 text-red-400 text-sm font-medium flex items-center gap-1">
                    <FaTimes size={14} /> {errors.description}
                  </p>
                )}
                <p className="mt-2 text-slate-400 text-xs">
                  {formData.description.length} characters (minimum 10)
                </p>
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border-2 border-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="electronics">📱 Electronics</option>
                  <option value="documents">📄 Documents</option>
                  <option value="clothing">👕 Clothing</option>
                  <option value="jewelry">💍 Jewelry</option>
                  <option value="keys">🔑 Keys</option>
                  <option value="wallet">💼 Wallet</option>
                  <option value="bag">🎒 Bag</option>
                  <option value="other">📦 Other</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "lost" })}
                    className={`px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${formData.status === "lost"
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                      }`}
                  >
                    Lost
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "found" })}
                    className={`px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${formData.status === "found"
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                      }`}
                  >
                    Found
                  </button>
                </div>
              </div>

              {/* Item Info */}
              <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500">
                <p className="text-slate-300 text-sm">
                  <span className="font-semibold">Item ID:</span> {id.substring(0, 12)}...
                </p>
                <p className="text-slate-300 text-sm mt-2">
                  <span className="font-semibold">Last Modified:</span> {new Date(existingItem.updatedAt || existingItem.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-600 my-8"></div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaCheck size={18} />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/manage-items")}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaTimes size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditItem;
