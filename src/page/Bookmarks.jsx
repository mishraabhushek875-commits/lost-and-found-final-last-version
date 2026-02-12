// src/pages/Bookmarks.jsx
import React from "react";
import { getBookmarks } from "../utils/storage";
import ItemCard from "../components/ItemCard";

const Bookmarks = () => {
  const bookmarks = getBookmarks();

  return (
    <div className="page">
      <h2>My Bookmarked Items</h2>

      {bookmarks.length === 0 ? (
        <p>No items bookmarked yet.</p>
      ) : (
        <div className="cards">
          {bookmarks.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;