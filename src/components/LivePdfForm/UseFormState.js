import { useEffect, useState } from "react";
import { usePdfGenerator } from "../../Hooks/usePdfGenerator";
import { validateForm } from "../../Utils/validateForm";
import { fieldDisplayNames } from "../../Utils/fieldDisplayNames";

export function useFormState() {
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const [templatePdf, setTemplatePdf] = useState(null);
  const { pdfUrl, generatePdf } = usePdfGenerator(templatePdf);

  const initialFormData = Object.keys(fieldDisplayNames).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});

  initialFormData.currentDate = new Date().toISOString().split("T")[0];
  initialFormData.currentTime = new Date().toLocaleTimeString();

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetch("/Form.pdf")
      .then((res) => res.arrayBuffer())
      .then(setTemplatePdf);
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => generatePdf(formData), 1000);
    return () => clearTimeout(timer);
  }, [formData, generatePdf]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // clears error from the input field
    if (errorField === name && value.trim() !== "") {
    setErrorField("");
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorField = validateForm(formData);

    console.log(errorField)

    if (errorField) {
      setErrorMessage(errorField.message);
      setErrorField(errorField.key); // ✅ save key globally

      // ✅ Try to focus on the input if it exists
      const field = document.querySelector(`[name="${errorField.key}"]`);
      if (field) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    if (!agreed) {
      setErrorMessage("⚠️ Please agree to the terms before submitting.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://192.168.1.20:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message);

      generatePdf(formData);
      setErrorMessage("✅ Form submitted, saved to CSV, and PDF generated!");
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setErrorMessage("❌ Could not submit form. Please try again.");
    }
  };

  return {
    agreed,
    setAgreed,
    errorMessage,
    errorField,
    setErrorField,
    pdfUrl,
    handleChange,
    formData,
    setFormData,
    handleSubmit,
  };
}
