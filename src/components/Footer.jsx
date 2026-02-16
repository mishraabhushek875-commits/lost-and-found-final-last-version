import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">Back2u</h3>
            <p className="text-slate-300 text-sm">
              Reuniting people with their lost belongings. Your trusted lost and found management platform.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-400 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-300 hover:text-white transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-300 hover:text-white transition duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaPhone size={16} className="text-blue-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope size={16} className="text-blue-400" />
                <span className="text-slate-300">support@back2u.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt size={16} className="text-blue-400 mt-1" />
                <span className="text-slate-300">123 Main St, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm text-center md:text-left">
            &copy; {currentYear} Back2u Portal | All rights reserved
          </p>
          <p className="text-slate-400 text-sm mt-4 md:mt-0">
            Made with ❤️ by Back2u Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;