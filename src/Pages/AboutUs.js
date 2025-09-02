import React from "react";

function AboutUs() {
  return (
    <div className="bg-one py-10 rounded-tr-[450px] rounded-br-[200px] sm:rounded-tr-[250px]">
      <div className="mx-6">
        <h1
          id="aboutUs"
          className="text-4xl font-bold text-seven ml-10 mb-4 py-8"
        >
          About Us
        </h1>
        <p className="text-seven-300 text-lg ml-10 text-justify pr-28 ">
          Queue Lynx has been proudly serving the community for over 15 years,
          offering trusted, reliable, and accurate drug testing services.
          Throughout this time, we have remained dedicated to ensuring the
          safety, well-being, and integrity of individuals and organizations
          alike. By providing comprehensive testing solutions, we contribute to
          fostering safer, more responsible environments for workplaces,
          schools, and various community settings. Our commitment to excellence
          and precision continues to make us a leading choice for those seeking
          dependable drug testing services.
        </p>
        <div className="gap-6 flex flex-row justify-center py-14 pr-20 text-center">
          {/* Card 1: Our Mission */}
          <div className="flex flex-col border rounded-[50px] bg-white px-7 py-4 shadow-xl hover:shadow-2xl hover:translate-y-[-10px] transition-all ease-in-out duration-500">
            <h2 className="text-3xl font-bold text-seven mb-4 ">Our Mission</h2>
            <p className="text-seven-300 text-lg text-justify">
              highest It is the mission of Queue Lynx Drug Testing Laboratory to
              deliver to our clients on a timely manner with credible and
              reliable data that was collected according to the standards as to
              reliability and quality drug test ,through constant innovation
              with the help of modern technology and to enhance the community to
              have a drug free environment.
            </p>
          </div>

          {/* Card 2: Our Vision */}
          <div className="flex flex-col border rounded-[50px] bg-white px-7 py-4 shadow-xl hover:shadow-2xl hover:translate-y-[-10px] transition-all ease-in-out duration-500">
            <h2 className="text-3xl font-bold text-seven mb-4 ">Our Vision</h2>
            <p className="text-seven-300 text-lg text-justify">
              Queue Lynx Drug Testing Laboratory is committed to becoming one of
              the top drug laboratories nationwide by being client oriented
              uniquely focused to serve our clients with pride and
              professionalism, not to welcome any corrupt practices laboratory
              personnel with bribe and anomalous attitude. enticing our
              laboratory personnel with bribe and anomalous attitude .
            </p>
          </div>

          {/* Card 3: Our Objectives */}
          <div className="flex flex-col border rounded-[50px] bg-white px-7 py-4 shadow-xl hover:shadow-2xl hover:translate-y-[-10px] transition-all ease-in-out duration-500">
            <h2 className="text-3xl font-bold text-seven mb-4 ">
              Our Objectives
            </h2>
            <p className="text-seven-300 text-lg text-justify">
              Queue Lynx Drug Testing Laboratory shall constantly ensure a drug
              test result with utmost reliability and integrity. Proper
              implementation of quality control shall be done by the management
              to uphold its task as its mission, vision and for its advocacy to
              ensure the regulatory and international standards are complied in
              the implementation of the quality systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
