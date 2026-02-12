import "./Report.module.css";

const ReportCard = ({ item, place, description }) => {
  return (
    <div className="reportCard">
      <h3>{item}</h3>
      <p>
        <strong>Place:</strong> {place}
      </p>
      <p>{description}</p>
    </div>
  );
};

export default ReportCard;
