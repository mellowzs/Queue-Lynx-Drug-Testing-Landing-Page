import Header from "../Header";
import Footer from "../Footer";
import FormFields from "./FormFields";
import SignaturePadField from "../SignaturePadField";
import PdfPreview from "../PdfPreview";
import FormAgreement from "./FormAgreement";
import SubmitSection from "./SubmitSection";
import { useFormState } from "./UseFormState";
import { motion } from "framer-motion";

export default function LivePdfForm() {
  const {
    agreed,
    setAgreed,
    errorMessage,
    pdfUrl,
    handleChange,
    formData,
    setFormData,
    handleSubmit,
    errorField,
    setErrorField,
  } = useFormState();


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-2xl font-extrabold text-center text-white pt-48 pb-16 px-11 drop-shadow-lg"
      >
        Drug Test Submission
      </motion.h1>

      <div className="flex flex-row sm:flex-col gap-6 p-6 flex-grow pb-48">
        <motion.form
          onSubmit={handleSubmit}
          className="w-1/2 sm:w-full bg-white shadow-lg rounded-xl p-6 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-bold border-b pb-2">Drug Test Form</h2>

          <FormFields
            formData={formData}
            handleChange={handleChange}
            errorField={errorField}
            errorMessage={errorMessage}
          />

          <SignaturePadField errorField={errorField} handleChange={handleChange} setErrorField={setErrorField}
            setSignature={(sig) =>
              setFormData((prev) => ({ ...prev, signature: sig }))
            }
          />

          <FormAgreement agreed={agreed} setAgreed={setAgreed} />

          <SubmitSection errorMessage={errorMessage} />
        </motion.form>

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
