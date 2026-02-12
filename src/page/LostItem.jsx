// src/pages/LostItems.jsx
import React from "react";
import { getLostReports } from "../utils/storage";
import ItemCard from "../components/ItemCard";

const LostItems = () => {
  const lostReports = getLostReports(); // localStorage se lost items nikalta hai

  return (
    <div className="page">
      <h2>Lost Items</h2>

      {lostReports.length === 0 ? (
        <p>No lost items reported yet.</p>
      ) : (
        <div className="cards">
          {lostReports.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LostItems;