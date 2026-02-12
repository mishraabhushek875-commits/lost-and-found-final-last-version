import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem } from "../Redux/store/adminSlice";

const AdminEditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.items);

  const existingItem = data.items.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    status: "lost",
  });

  useEffect(() => {
    if (existingItem) {
      setFormData({
        title: existingItem.title,
        description: existingItem.description,
        category: existingItem.category,
        status: existingItem.status,
      });
    }
  }, [existingItem,]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ id, updatedData: formData }));
    navigate("/admin/manage-items");
  };

  if (!existingItem) {
    return <p className="p-6 text-red-600 font-semibold">Item not found.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-lg transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          ✏️ Edit Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter item title"
              className="border rounded-lg p-3 w-full text-gray-900 placeholder-gray-500 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows="3"
              className="border rounded-lg p-3 w-full text-gray-900 placeholder-gray-500 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="electronics">Electronics</option>
              <option value="documents">Documents</option>
              <option value="clothing">Clothing</option>
              <option value="jewelry">Jewelry</option>
              <option value="keys">Keys</option>
              <option value="wallet">Wallet</option>
              <option value="bag">Bag</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/manage-items")}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-md"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditItem;
