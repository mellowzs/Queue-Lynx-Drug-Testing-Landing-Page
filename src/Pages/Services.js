import React from "react";
import { motion } from "framer-motion";
import { FaAmbulance, FaBuilding, FaUsers, FaClipboardCheck, FaBrain } from "react-icons/fa";

function Services() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="services" className="min-h-screen bg-white py-20 px-6 sm:px-4">
      {/* Section Title */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-2xl font-extrabold text-center text-black mb-12 drop-shadow-lg"
      >
        Our <span className="text-green-400">Services</span>
      </motion.h2>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-3 max-w-7xl items-center justify-center mx-auto">
        {/* Mobile Collection */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaAmbulance className="text-green-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-black mb-4">Mobile Collection</h3>
          <p className="text-black leading-relaxed">
            We specialize in Remote Collection Operations (RCO), bringing drug
            testing directly to your workplace for maximum convenience and
            productivity.
          </p>
        </motion.div>

        {/* Workplace Testing */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaBuilding className="text-green-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-black mb-4">Workplace Testing</h3>
          <p className="text-black leading-relaxed">
            On-site testing services tailored for businesses and institutions,
            reducing downtime and ensuring compliance with industry standards.
          </p>
        </motion.div>

        {/* Community Testing */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaUsers className="text-green-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-black mb-4">Community Testing</h3>
          <p className="text-black leading-relaxed">
            Serving schools, local government units, and organizations with
            reliable drug testing programs that promote safer communities.
          </p>
        </motion.div>

        {/* Compliance & Certification */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaClipboardCheck className="text-green-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-black mb-4">Compliance & Certification</h3>
          <p className="text-black leading-relaxed">
            Accredited services that ensure all tests meet national and
            international quality standards for legal and professional use.
          </p>
        </motion.div>

        {/* Neuro-Psychometric */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaBrain className="text-green-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-black mb-4">Neuro-Psychometric</h3>
          <p className="text-black leading-relaxed">
            Offering psychological and cognitive assessments that support mental
            health, workplace readiness, and overall well-being.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Services;
