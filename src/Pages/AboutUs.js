import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaChartLine } from "react-icons/fa";

function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="aboutUs" className="relative min-h-screen bg-seven py-20 px-6 sm:px-4">

      {/* Title */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-2xl font-extrabold text-center text-white mb-12 drop-shadow-lg"
      >
        About <span className="text-cyan-400">Queue Lynx</span>
      </motion.h2>

      {/* About Short Tagline */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto text-gray-300 text-lg sm:text-base text-center mb-8 leading-relaxed"
      >
        Queue Lynx is dedicated to providing efficient and reliable drug testing
        services. We specialize in Remote Collection Operation (RCO) / Mobile
        testing. Instead of coming to us, we come to you — directly at your
        workplace — saving valuable time, reducing disruptions, and boosting
        productivity.
      </motion.p>

      {/* About Long Paragraph (15 years of service) */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-5xl mx-auto text-gray-300 text-lg sm:text-base text-center mb-16 leading-relaxed"
      >
        Queue Lynx has been proudly serving the community for over{" "}
        <span className="text-cyan-400 font-semibold">15 years</span>, offering
        trusted, reliable, and accurate drug testing services. Throughout this
        time, we have remained dedicated to ensuring the safety, well-being, and
        integrity of individuals and organizations alike. By providing
        comprehensive testing solutions, we contribute to fostering safer, more
        responsible environments for workplaces, schools, and community
        settings. Our commitment to excellence and precision continues to make
        us a leading choice for dependable drug testing services.
      </motion.p>

      {/* Mission, Vision, Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Mission */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaBullseye className="text-cyan-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Mission</h3>
          <p className="text-gray-300 leading-relaxed">
            It is the mission of Queue Lynx Drug Testing Laboratory to deliver
            timely, credible, and reliable data collected according to strict
            standards of reliability and quality. Through innovation and modern
            technology, we aim to enhance the community and promote a drug-free
            environment.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaEye className="text-cyan-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Vision</h3>
          <p className="text-gray-300 leading-relaxed">
            Queue Lynx Drug Testing Laboratory is committed to becoming one of
            the top drug testing laboratories nationwide by being client-oriented,
            professional, and ethical — rejecting any corrupt practices and
            fostering a culture of pride and integrity.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          <FaChartLine className="text-cyan-400 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Objectives</h3>
          <p className="text-gray-300 leading-relaxed">
            Queue Lynx Drug Testing Laboratory shall constantly ensure drug test
            results with utmost reliability and integrity. Proper quality control
            shall be implemented by management to uphold our mission, vision,
            and advocacy, ensuring compliance with regulatory and international
            standards.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
