import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaTachometerAlt, FaBoxes, FaSignOutAlt, FaHome } from 'react-icons/fa';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    closeMenu();
  };

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 group"
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:shadow-lg transition-all">
              <FaTachometerAlt className="text-white text-xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-400">Back2u Management</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition duration-300 font-medium group"
              >
                <FaTachometerAlt className="group-hover:scale-110 transition-transform" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-items"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition duration-300 font-medium group"
              >
                <FaBoxes className="group-hover:scale-110 transition-transform" />
                Manage Items
              </Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <FaHome size={16} />
              Back to Site
            </button>
            
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-white focus:outline-none transition duration-300"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-in fade-in slide-in-from-top">
          <div className="px-4 py-4 space-y-2">
            {/* Navigation Links */}
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-blue-400 rounded-lg transition duration-300 font-medium"
            >
              <FaTachometerAlt />
              Dashboard
            </Link>
            <Link
              to="/admin/manage-items"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-blue-400 rounded-lg transition duration-300 font-medium"
            >
              <FaBoxes />
              Manage Items
            </Link>

            {/* Divider */}
            <div className="border-t border-slate-700 my-3"></div>

            {/* Mobile Buttons */}
            <button
              onClick={() => {
                navigate('/');
                closeMenu();
              }}
              className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaHome size={16} />
              Back to Site
            </button>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;