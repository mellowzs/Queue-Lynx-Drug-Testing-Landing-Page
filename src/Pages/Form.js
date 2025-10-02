import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer.js";
import FormFields from "../components/FormFields";
import SignaturePadField from "../components/SignaturePadField";
import PdfPreview from "../components/PdfPreview";
import { usePdfGenerator } from "../Hooks/usePdfGenerator";
import { motion } from "framer-motion";

function LivePdfForm() {
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mapping of field names to display names
  const fieldDisplayNames = {
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    age: 'Age',
    birthdate: 'Birth Date',
    gender: 'Gender',
    civilStatus: 'Civil Status',
    birthRegion: 'Birth Region',
    birthProvince: 'Birth Province',
    birthCity: 'Birth City',
    companyName: 'Company Name',
    purpose: 'Purpose',
    otherPurpose: 'Other Purpose',
    medication: 'Medication',
    medicationYes: 'If Yes, Please Specify',
    alcohol: 'Alcohol',
    validIdType: 'Valid ID Type',
    otherValidId: 'Other Valid ID',
    companyNameId: 'Company Name on ID',
    validIdNumber: 'Valid ID Number',
    region: 'Region',
    province: 'Province',
    city: 'City',
    barangay: 'Barangay',
    signature: 'Signature'
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Your existing validation
    const inputs = document.querySelectorAll(
      "form input, form select, form textarea"
    );

    for (let input of inputs) {
      if (!input.value.trim()) {
        const displayName = fieldDisplayNames[input.name] || input.name || 'field';
        setErrorMessage(`⚠️ Please fill out the "${displayName}" field.`);
        input.focus();
        return;
      }
    }

    if (!agreed) {
      setErrorMessage("⚠️ Please agree to the terms before submitting.");
      return;
    }

    setErrorMessage(''); // Clear error message if validation passes

    try {
      // 🚀 Send formData to Express backend
      const response = await fetch("http://192.168.1.20:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message);

      // ✅ Still generate the PDF
      generatePdf(formData);

      setErrorMessage("✅ Form submitted, saved to CSV, and PDF generated!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setErrorMessage("❌ Could not submit form. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    birthdate: "",
    gender: "",
    civilStatus: "",
    birthRegion: "",
    birthProvince: "",
    birthCity: "",
    companyName: "",
    purpose: "",
    otherPurpose: "",
    medication: "",
    medicationYes: "",
    alcohol: "",
    validIdType: "",
    otherValidId: "",
    companyNameId: "",
    validIdNumber: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    signature: "",
    currentDate: new Date().toISOString().split("T")[0],
    currentTime: new Date().toLocaleTimeString(),

  });

  const [templatePdf, setTemplatePdf] = useState(null);
  const { pdfUrl, generatePdf } = usePdfGenerator(templatePdf);

  // Load template once
  useEffect(() => {
    fetch("/Form.pdf")
      .then((res) => res.arrayBuffer())
      .then(setTemplatePdf);
  }, []);

  // Auto-calc age when birthdate changes
  useEffect(() => {
    if (formData.birthdate) {
      const birth = new Date(formData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age }));
    }
  }, [formData.birthdate]);

  // Generate PDF only when user stops typing (debounced)
  useEffect(() => {
    if (!formData) return;

    const typingTimer = setTimeout(() => {
      generatePdf(formData);
    }, 1000);

    return () => clearTimeout(typingTimer);
  }, [formData, generatePdf]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-2xl font-extrabold text-center text-white pt-48 pb-16 px-11 drop-shadow-lg"
      >
        <span className="text-white">Drug Test Submission</span>
      </motion.h1>

      {/* Main Content should grow */}
      <div className="flex flex-row sm:flex-col gap-6 p-6 flex-grow pb-48">
        {/* Form */}
        <motion.form
          className="w-1/2 sm:w-full bg-white shadow-lg rounded-xl p-6 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-bold border-b pb-2">Drug Test Form</h2>
          <FormFields formData={formData} handleChange={handleChange} />
          <SignaturePadField
            setSignature={(sig) =>
              setFormData((prev) => ({ ...prev, signature: sig }))
            }
          />
          <div className="flex items-start space-x-2 mt-4 bg-black/5 py-8 sm:py-5 rounded-lg">
            <div className="flex flex-row">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="ml-3 size-6 rounded-lg"
              />
              <div className="mx-4">
                <label
                  htmlFor="agreement"
                  className="sm:text-xs text-base text-black text-justify block"
                >
                  I have read the{" "}
                  <a
                    href="/TOS.pdf"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Terms and Agreement
                  </a>{" "}
                  and agree that my personal information will be collected and
                  used solely for processing this drug test, kept confidential,
                  and not disclosed to unauthorized parties.
                </label>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="g-blue-600 text-white px-4 py-2 w-32 rounded bg-blue-700 hover:bg-blue-900 transition"
              >
                Submit
              </button>
              {errorMessage && (
                <div className={`text-sm p-3 rounded-lg ${
                  errorMessage.includes('✅')
                    ? 'bg-green-100 w-full text-green-700 border border-green-200'
                    : 'bg-red-100 w-full text-red-700 border border-red-200'
                } text-center`}>
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </motion.form>

        {/* PDF Preview */}
        <motion.div
          className="w-1/2 sm:w-full"
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <PdfPreview pdfUrl={pdfUrl} />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default LivePdfForm;
