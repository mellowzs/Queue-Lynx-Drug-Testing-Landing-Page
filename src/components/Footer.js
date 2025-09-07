import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/H_QL_Logo.png';
import DOH from '../Assets/DOH.png';

function Footer() {
  return (
    <footer className="bg-seven/90 backdrop-blur-sm bottom-0 left-0 right-0 w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Logo and Description */}
          <div className="space-y-6">
            <div className='flex flex-row space-x-6 items-center'>
              <img src={DOH} alt="Department of Health Logo" className="h-20 mt-2" />
              <img src={Logo} alt="Queue Lynx Logo" className="h-28" />
            </div>
            <p className="text-gray-300 max-w-xl">
              Providing efficient and reliable drug testing services with a commitment to quality and professionalism for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/QueuelynxDTL" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-secondary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Quick Links and Contact Info */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/form" className="text-gray-300 hover:text-secondary transition-colors">
                    Form
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">
                  <p>Iriga-Baao Road/Highway 1</p>
                  <p>San Isidro, Iriga City</p>
                  <p>Camarines Sur</p>
                </li>
                <li className="text-gray-300">
                  Phone: +63 915 360 8132
                </li>
                <li>
                  <a href="mailto:info@queuelynx.com" 
                     className="text-gray-300 hover:text-secondary transition-colors">
                    info@queuelynx.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Queue Lynx Drug Testing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;