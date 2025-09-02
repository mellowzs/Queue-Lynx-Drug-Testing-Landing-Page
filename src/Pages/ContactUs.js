import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "mt-1 block w-full rounded-lg bg-white/5 border border-gray-600 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300";

  // Add this constant for locations
  const locations = [
    {
      name: "Queue Lynx Iriga Main Branch",
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31044.10367384066!2d123.36415637431638!3d13.442446499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a197006e6fec69%3A0xbfa42ae1455ce121!2sQueue%20Lynx%20Drug%20Testing%20Laboratory!5e0!3m2!1sen!2sph!4v1756652401668!5m2!1sen!2sph">',
      address:
        "Iriga-Baao Road/Highway 1 near Our Lady of Fatima Parish & Shrine, San Isdiro, Iriga City, Camarines Sur",
      phone: "+639153608132",
      email: "main@queuelynx.com",
      facebook: "https://www.facebook.com/share/159iWuzq3cU/",
    },
    {
      name: "Queue Lynx Naga Branch",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31020.237818395086!2d123.15927028656002!3d13.625509298282273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a18ccc9b1dde5b%3A0x29f3bcccaaeffbb3!2sQueue%20Lynx%20Drug%20Testing%20Laboratory!5e0!3m2!1sen!2sph!4v1756651917932!5m2!1sen!2sph",
      address: "Branch Office Address, City, Country",
      phone: "+1 098 765 432",
      email: "branch@queuelynx.com",
      facebook:
        "https://www.facebook.com/Queue-Lynx-Drug-Testing-Center-943631199060505/",
    },
  ];

  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-six">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="contactUs" className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 text-lg">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
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

              <button
                type="submit"
                className="w-1/3 sm:w-1/2 bg-secondary  bg-three hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Info Section */}
          <div className="space-y-8">
            {/* Location Tabs */}
            <div className="flex space-x-4 mb-4">
              {locations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLocation(index)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeLocation === index
                      ? "bg-secondary text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>

            {/* Map Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <div className="w-full h-[300px] lg:h-[400px] touch-pan-y">
                <iframe
                  src={locations[activeLocation].map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${locations[activeLocation].name} Location`}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6">
                {locations[activeLocation].name}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{locations[activeLocation].address}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{locations[activeLocation].phone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{locations[activeLocation].email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                  <a
                    href={locations[activeLocation].facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors duration-300"
                  >
                    Visit our Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
