import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, resetItemState } from "../Redux/store/itemsSlice";
import { toast } from "sonner";

const ReportFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ UPDATED STATE NAMES
  const { createSuccess, createLoading, error } = useSelector(
    (state) => state.items
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    imagePreview: "",
    file: null,
  });

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE IMAGE ================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imagePreview: url,
        file: file,
      });
    }
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("status", "found");

    if (formData.file) {
      formDataToSend.append("image", formData.file);
    }

    dispatch(createItem(formDataToSend));
  };

  /* ================= SUCCESS / ERROR HANDLING ================= */

  useEffect(() => {
    if (createSuccess) {
      toast.success("Item reported successfully");
      dispatch(resetItemState());
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(resetItemState());
      navigate("/login");
    }
  }, [createSuccess, error, navigate, dispatch]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-6 py-20">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Report Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="electronics">⚡ Electronics</option>
              <option value="documents">📄 Documents</option>
              <option value="clothing">👕 Clothing</option>
              <option value="jewelry">💍 Jewelry</option>
              <option value="keys">🔑 Keys</option>
              <option value="wallet">👛 Wallet</option>
              <option value="bag">🎒 Bag</option>
              <option value="other">📦 Other</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {formData.imagePreview && (
              <div className="mt-4">
                <img
                  src={formData.imagePreview}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createLoading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {createLoading ? "Submitting..." : "Submit Report"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ReportFound;
