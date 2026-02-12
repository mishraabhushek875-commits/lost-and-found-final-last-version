import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportFound.css";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../Redux/store/itemsSlice";
import { toast } from "sonner";

const ReportFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    imagePreview: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("status", "lost");
    if (formData.file) {
      formDataToSend.append("image", formData.file);
    }

    dispatch(createItem(formDataToSend));

    setFormData({
      title: "",
      description: "",
      category: "other",
      imagePreview: "",
      file: null,
    });

    if (success) toast.success("Item created successfully");
    if (error) toast.error("Error in creating item");

    navigate("/");
  };

  return (
    <div className="form-container bg-black">
      <h2>Report Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
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

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.imagePreview && (
          <div className="image-preview">
            <img src={formData.imagePreview} alt="preview" />
          </div>
        )}

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportFound;
