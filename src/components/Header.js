import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Assets/Qlynx2.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarHeight = 120; // Adjust this to your navbar height

  const handleNavigation = useCallback(
    (section) => {
      if (window.location.pathname !== "/") {
        navigate("/", { state: { scrollTo: section } });
      } else {
        const targetElement = document.getElementById(section);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - navbarHeight;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }

      setIsMenuOpen(false);
    },
    [navigate]
  );


  const navigationItems = [
    {
      id: "home",
      label: "Home",
      action: () => navigate("/"),
      showOnlyOutsideHome: true,
    },
    {
      id: "aboutUs",
      label: "About Us",
      action: () => handleNavigation("aboutUs"),
    },
    {
      id: "contact",
      label: "Contact",
      action: () => handleNavigation("contactUs"),
    },
    {
      id: "services",
      label: "Services",
      action: () => handleNavigation("services"),
    },
  ];

  const commonButtonClasses =
    "text-seven text-xl font-bold transition-all duration-300";
  const desktopButtonClasses = `${commonButtonClasses} relative hover:text-one after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full`;
  const mobileButtonClasses = `${commonButtonClasses} py-4 px-6 hover:bg-one hover:text-zero transform hover:pl-12 text-center`;

  const renderNavigationButton = (item, isMobile = false) => {
    if (item.showOnlyOutsideHome && location.pathname === "/") return null;

    return (
      <button
        key={item.id}
        onClick={item.action}
        className={isMobile ? mobileButtonClasses : desktopButtonClasses}
      >
        {item.label}
      </button>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 sm:h-16 bg-zero mt-5 sm:mt-3 mx-3 
        transition-[border-radius] duration-100 ease-in-out
        ${
          isMenuOpen
            ? "rounded-t-3xl rounded-b-none"
            : "rounded-3xl delay-[250ms]"
        }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div id="logo" onClick={() => navigate("/")} className="cursor-pointer">
          <img src={Logo} alt="Logo" className="h-12 lg:h-16 ml-5" />
        </div>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 mr-5 rounded-full">
          {navigationItems.map((item) => renderNavigationButton(item))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden bg-zero overflow-hidden origin-top transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "transform scale-y-100 opacity-100 rounded-b-3xl delay-[50ms]"
              : "transform scale-y-0"
          }`}
      >
        <nav className="px-7">
          <div className="flex flex-col overflow-hidden">
            {navigationItems.map((item) => renderNavigationButton(item, true))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
