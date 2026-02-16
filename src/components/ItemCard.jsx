// src/components/ItemCard.jsx
import React from "react";
import { FaTag, FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaHourglassEnd } from "react-icons/fa";

const ItemCard = ({ item }) => {
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "lost":
        return "bg-red-100 text-red-800 border border-red-300";
      case "found":
        return "bg-green-100 text-green-800 border border-green-300";
      case "claimed":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getItemStatusIcon = (itemStatus) => {
    if (itemStatus?.toLowerCase() === "claimed") {
      return <FaCheckCircle className="text-green-500" />;
    }
    return <FaHourglassEnd className="text-amber-500" />;
  };

  const isExpiringSoon = new Date(item.expiryDate) - new Date() < 86400000; // 24 hours

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 h-56">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <FaTag className="text-4xl text-slate-300 mb-2" />
            <span className="text-slate-500 font-medium">No image available</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusBadgeColor(item.status)}`}>
            {item.status}
          </span>
        </div>

        {/* Expiring Soon Badge */}
        {isExpiringSoon && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
              <FaHourglassEnd size={12} /> Expiring Soon
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
          {/* Category */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaTag className="text-blue-600 text-xs" />
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Category</span>
              <p className="text-sm font-medium text-gray-800">{item.category}</p>
            </div>
          </div>

          {/* Item Status */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-amber-100 rounded-lg flex items-center justify-center">
              {getItemStatusIcon(item.itemStatus)}
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Item Status</span>
              <p className="text-sm font-medium text-gray-800 capitalize">{item.itemStatus}</p>
            </div>
          </div>

          {/* Posted By */}
          {item.postedBy && (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-purple-600 text-xs" />
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Posted By</span>
                <p className="text-sm font-medium text-gray-800">{item.postedBy.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dates Section */}
        <div className="space-y-2 mb-4">
          {/* Created Date */}
          <div className="flex items-center justify-between px-2 py-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-orange-500 text-sm" />
              <span className="text-xs text-gray-600">Posted</span>
            </div>
            <span className="text-xs font-medium text-gray-800">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Expiry Date */}
          <div className={`flex items-center justify-between px-2 py-2 rounded-lg ${isExpiringSoon ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center gap-2">
              <FaClock className={`text-sm ${isExpiringSoon ? 'text-red-500' : 'text-green-500'}`} />
              <span className={`text-xs ${isExpiringSoon ? 'text-red-700' : 'text-gray-600'} font-semibold`}>
                Expires
              </span>
            </div>
            <span className={`text-xs font-bold ${isExpiringSoon ? 'text-red-800' : 'text-gray-800'}`}>
              {new Date(item.expiryDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
