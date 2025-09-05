import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Doc from "../Assets/Intro.png";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="h-full mt-56 sm:mt-20">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-2xl font-extrabold text-center text-white py-8 px-11 drop-shadow-lg"
      >
        Welcome to <span className="text-cyan-400">Queue Lynx Drug Testing</span>
      </motion.h1>

      {/* Content Wrapper */}
      <div className="flex flex-row items-center justify-center">
        {/* Left - Image */}
        <motion.img
          src={Doc}
          alt="Intro"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-[550px] sm:h-[200px] pl-48 sm:pl-6 drop-shadow-xl rounded-xl"
        />

        {/* Right - Short Tagline + Button */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <p className="text-white text-xl sm:text-sm px-48 sm:px-6 py-20 sm:py-4 mt-26 sm:mt-4 text-center leading-relaxed">
            <span className="font-semibold text-cyan-400">Efficient, Mobile, and Reliable</span>  
            — we bring drug testing directly to your workplace.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/form")}
            className="flex items-center gap-2 bg-white text-black font-bold py-3 px-6 rounded-lg mx-auto shadow-md hover:shadow-xl transition duration-300"
          >
            Get Started <FaArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Intro;
