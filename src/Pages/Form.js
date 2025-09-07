import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer.js";
import FormFields from "../components/FormFields";
import SignaturePadField from "../components/SignaturePadField";
import PdfPreview from "../components/PdfPreview";
import { usePdfGenerator } from "../Hooks/usePdfGenerator";

function LivePdfForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    birthdate: "",
    age: "",
    birthplace: "",
    gender: "",
    civilStatus: "",
    companyName: "",
    purpose: "",
    otherPurpose: "",
    validIdType: "",
    validIdNumber: "",
    signature: "",
    currentDate: new Date().toISOString().split("T")[0],
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
    <div>
      <Header />
      <div className="flex flex-row sm:flex-col gap-6 p-6 pt-40">
        {/* Form */}
        <form className="w-1/2 sm:w-full bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Drug Test Form</h2>
          <FormFields formData={formData} handleChange={handleChange} />
          <SignaturePadField
            setSignature={(sig) =>
              setFormData((prev) => ({ ...prev, signature: sig }))
            }
          />
          <div className="pt-24 pb-4 float-end">
          <button
            type="button"
            onClick={async () => {
              await generatePdf(formData);
              alert("Form Submitted! You can download it from the preview section.");
            }}
            className="bg-blue-600 text-white px-4 py-2 w-32 rounded hover:bg-blue-700 transition left-1/2"
          >
            Submit
          </button>
          </div>
        </form>

        {/* PDF Preview */}
        <PdfPreview pdfUrl={pdfUrl} />
      </div>
      <Footer />
    </div>
  );
}

export default LivePdfForm;
