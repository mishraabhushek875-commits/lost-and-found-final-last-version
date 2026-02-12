// src/components/ItemCard.jsx
import React from "react";
import { FaTag, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

const ItemCard = ({ item }) => {
  return (
    <div className="card border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {item.images && item.images.length > 0 ? (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded mb-4">
          <span className="text-gray-400">No image available</span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-3">{item.description}</p>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <FaTag className="text-blue-500" /> <strong>Category:</strong>{" "}
          {item.category}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-green-500" /> <strong>Status:</strong>{" "}
          {item.status} ({item.itemStatus})
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-purple-500" /> <strong>Posted By:</strong>{" "}
          {item.postedBy?.name} ({item.postedBy?.email})
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-orange-500" />{" "}
          <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" /> <strong>Expires:</strong>{" "}
          {new Date(item.expiryDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
