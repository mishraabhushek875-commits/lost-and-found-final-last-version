import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/store/authSlice";
import { toast } from "sonner";
import {
  FaHome,
  FaInfoCircle,
  FaClipboardList,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ✅ role check (from user object or localStorage)
  const role = user?.role || localStorage.getItem("role");

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-black text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/lost-and-foundlogo.png"
              alt="Back2u Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <Link to="/" ><h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Back2u
            </h1></Link>
            
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li><Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-blue-400"><FaHome /> Home</Link></li>
            <li><Link to="/about" className="flex items-center gap-2 text-gray-300 hover:text-blue-400"><FaInfoCircle /> About</Link></li>
            <li><Link to="/report" className="flex items-center gap-2 text-gray-300 hover:text-blue-400"><FaClipboardList /> Report Item</Link></li>
            <li><Link to="/contact" className="flex items-center gap-2 text-gray-300 hover:text-blue-400"><FaEnvelope /> Contact</Link></li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {role === "admin" && (
                  <button
                    onClick={() => handleNavigate("/admin/dashboard")}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleNavigate("/login")} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Log In</button>
                <button onClick={() => handleNavigate("/signup")} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Sign Up</button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={toggleMenu} className="md:hidden text-2xl text-white w-[30px] h-[30px] flex items-center justify-center">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400"><FaHome /> Home</Link>
            <Link to="/about" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400"><FaInfoCircle /> About</Link>
            <Link to="/report" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400"><FaClipboardList /> Report Item</Link>
            <Link to="/contact" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-blue-400"><FaEnvelope /> Contact</Link>

            <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
              {user ? (
                <>
                  {role === "admin" && (
                    <button
                      onClick={() => handleNavigate("/admin/dashboard")}
                      className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
                    >
                      Admin Panel
                    </button>
                  )}
                  <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleNavigate("/login")} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Log In</button>
                  <button onClick={() => handleNavigate("/signup")} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;