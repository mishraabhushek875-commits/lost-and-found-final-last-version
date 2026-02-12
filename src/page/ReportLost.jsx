import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReport } from "../utils/storage";  // <-- important import
import "./ReportLost.css";

const ReportLost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item: "",
    location: "",
    description: "",
    date: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create unique ID for the report
    const id = "lost_" + Date.now();

    // Format data to save in localStorage
    const newReport = {
      id: id,
      type: "lost",
      itemName: formData.item,
      location: formData.location,
      description: formData.description,
      date: formData.date,
      contact: formData.contact,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save report in localStorage
    addReport(newReport);

    alert("Lost item reported successfully!");

    // Reset form
    setFormData({
      item: "",
      location: "",
      description: "",
      date: "",
      contact: "",
    });

    // Redirect to Lost Items page
    navigate("/lost-item");
  };

  return (
    <div className="form-container">
      <h2>Report Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="item"
          placeholder="Item Name"
          value={formData.item}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Lost Location"
          value={formData.location}
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

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Your Contact Info"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Lost Report</button>
      </form>
    </div>
  );
};

export default ReportLost;
