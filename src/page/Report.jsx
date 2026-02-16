import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaExclamationTriangle } from "react-icons/fa";

const Report = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 animate-fade-in">
        
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Report an Item
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Choose whether you want to report a lost item or a found item.
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lost Item Card */}
          <Link
            to="/report-lost"
            className="report-card flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-red-50"
          >
            <FaExclamationTriangle className="text-red-600 text-4xl mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Report Lost Item</h2>
            <p className="text-gray-600">If you lost something, submit details here.</p>
          </Link>

          {/* Found Item Card */}
          <Link
            to="/report-found"
            className="report-card flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-green-50"
          >
            <FaSearch className="text-green-600 text-4xl mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Report Found Item</h2>
            <p className="text-gray-600">Found something? Help return it to the owner.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;