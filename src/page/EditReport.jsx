import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReports, saveUpdatedReport } from "../utils/storage";

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  useEffect(() => {
    const allReports = getReports();
    const selected = allReports.find((r) => r.id === id);
    setReport(selected);
  }, [id]);

  if (!report) return <h2>Loading...</h2>;

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveUpdatedReport(report);
    alert("Report updated successfully!");
    navigate(-1);
  };

  return (
    <div className="page">
      <h2>Edit Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          value={report.itemName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          value={report.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={report.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          value={report.contact}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditReport;
