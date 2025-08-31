import React, { useState } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import Logo from "../Assets/Qlynx2.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: section } });
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  const navButtonClass = "relative text-white text-xl font-bold transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo/Brand */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <img src={Logo} alt="Logo" className="h-12 lg:h-16" />
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8">
          {location.pathname !== "/" && (
            <button onClick={() => navigate("/")} className={navButtonClass}>
              Home
            </button>
          )}
          <button
            onClick={() => handleNavigation("aboutUs")}
            className={navButtonClass}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className={navButtonClass}
          >
            Contact
          </button>
          <button
            onClick={() => handleNavigation("services")}
            className={navButtonClass}
          >
            Services
          </button>
        </nav>
      </div>

      {/* Mobile Navigation with animation */}
      <div className={`transform transition-all duration-300 backdrop-blur-lg ease-in-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <nav className="lg:hidden border-t border-white/10">
          <div className="flex flex-col gap-4 text-white rounded-lg p-4 shadow-lg">
            {location.pathname !== "/" && (
              <button 
                onClick={() => navigate("/")} 
                className={`text-left py-2 hover:bg-white/10 rounded-md px-3 transition-all duration-300`}
              >
                Home
              </button>
            )}
            <button
              onClick={() => handleNavigation("aboutUs")}
              className={`text-right py-2 hover:bg-white/10 rounded-md px-3 transition-all duration-300`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className={`text-right py-2 hover:bg-white/10 rounded-md px-3 transition-all duration-300`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigation("services")}
              className={`text-right py-2 hover:bg-white/10 rounded-md px-3 transition-all duration-300`}
            >
              Services
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
