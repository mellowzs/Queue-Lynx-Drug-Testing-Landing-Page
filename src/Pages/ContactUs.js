import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "mt-1 block w-full rounded-lg bg-white/5 border border-gray-600 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary hover:border-secondary transition-all duration-300";

  const locations = [
    {
      name: "Queue Lynx Iriga Main Branch",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31044.10367384066!2d123.36415637431638!3d13.442446499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a197006e6fec69%3A0xbfa42ae1455ce121!2sQueue%20Lynx%20Drug%20Testing%20Laboratory!5e0!3m2!1sen!2sph!4v1756652401668!5m2!1sen!2sph",
      address:
        "Iriga-Baao Road/Highway 1 near Our Lady of Fatima Parish & Shrine, San Isidro, Iriga City, Camarines Sur",
      phone: "+63 915 360 8132",
      email: "main@queuelynx.com",
      facebook: "https://www.facebook.com/share/159iWuzq3cU/",
    },
    {
      name: "Queue Lynx Naga Branch",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31020.237818395086!2d123.15927028656002!3d13.625509298282273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a18ccc9b1dde5b%3A0x29f3bcccaaeffbb3!2sQueue%20Lynx%20Drug%20Testing%20Laboratory!5e0!3m2!1sen!2sph!4v1756651917932!5m2!1sen!2sph",
      address: "Branch Office Address, Naga City, Camarines Sur",
      phone: "+63 987 654 321",
      email: "branch@queuelynx.com",
      facebook:
        "https://www.facebook.com/Queue-Lynx-Drug-Testing-Center-943631199060505/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-seven">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            id="contactUs"
            className="text-4xl font-bold text-white mb-4"
          >
            Get in Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-300 text-lg"
          >
            We’d love to hear from you. Send us a message or visit one of our
            branches.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={inputClass}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-1/3 sm:w-1/2 bg-secondary bg-three hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Send Message
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 mt-4"
                  >
                    ✅ Thank you! Your message has been sent.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Location Tabs */}
            <div className="flex flex-wrap gap-3 mb-4">
              {locations.map((location, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeLocation === index
                      ? "bg-secondary text-white shadow-md scale-105"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {location.name}
                </motion.button>
              ))}
            </div>

            {/* Map Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={locations[activeLocation].map}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${locations[activeLocation].name} Location`}
                className="w-full h-[300px] lg:h-[400px]"
              />
            </div>

            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6">
                {locations[activeLocation].name}
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center">
                  📍 <span className="ml-3">{locations[activeLocation].address}</span>
                </div>
                <div className="flex items-center">
                  ☎️ <span className="ml-3">{locations[activeLocation].phone}</span>
                </div>
                <div className="flex items-center">
                  📧 <span className="ml-3">{locations[activeLocation].email}</span>
                </div>
                <div className="flex items-center">
                  🌐
                  <a
                    href={locations[activeLocation].facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 hover:text-secondary transition-colors duration-300"
                  >
                    Visit our Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
