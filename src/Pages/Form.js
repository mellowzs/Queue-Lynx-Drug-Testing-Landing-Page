import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer.js";
import FormFields from "../components/FormFields";
import SignaturePadField from "../components/SignaturePadField";
import PdfPreview from "../components/PdfPreview";
import { usePdfGenerator } from "../Hooks/usePdfGenerator";

function LivePdfForm() {
  const [agreed, setAgreed] = useState(false);
  const handleSubmit = () => {
    if (!agreed) {
      alert("⚠️ Please agree to the terms before submitting.");
      return;
    }

    generatePdf(formData);
    alert("✅ Form submitted and PDF generated!");
  };

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
          <div className="flex items-start space-x-2 mt-4 bg-black/10 py-14 rounded-lg">
            <div className="flex flex-row">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="ml-5 size-6 rounded-lg"
              />
              <div className="mx-4">
                <label
                  htmlFor="agreement"
                  className="sm:text-sm text-base text-gray-700 text-justify block"
                >
                  I have read the{" "}
                  <a
                    href="/TOS.pdf"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Terms and Agreement
                  </a>
                   {" "}and agree that my personal information will be collected and
                  used solely for processing this drug test, kept confidential,
                  and not disclosed to unauthorized parties.
                </label>
              </div>
            </div>
          </div>
          <div className="pb-4 float-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="g-blue-600 text-white px-4 py-2 w-32 rounded bg-blue-700 hover:bg-blue-900 transition left-1/2"
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
