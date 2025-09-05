import React, { useState, useEffect, useRef } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import SignaturePad from "signature_pad";
import Header from "../components/Header";

function LivePdfForm() {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

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
    validIdType: "",
    validIdNumber: "",
    signature: "",
  });

  const [pdfUrl, setPdfUrl] = useState(null);

  // Initialize signature pad
  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignaturePad(canvasRef.current, {
        minWidth: 1,
        maxWidth: 1,
        penColor: "rgb(66, 133, 244)",
      });
      signaturePadRef.current = pad;
    }
  }, []);

  // Auto-calculate age from birthdate
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

  // Generate PDF
  useEffect(() => {
    const generatePdf = async () => {
      try {
        const formUrl = "/form.pdf"; // place form.pdf inside /public
        const formPdfBytes = await fetch(formUrl).then((res) =>
          res.arrayBuffer()
        );

        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page = pdfDoc.getPages()[0];

        // Example text positions (adjust to match your PDF layout)
        page.drawText(
          `${formData.lastName}, ${formData.firstName} ${formData.middleName}`,
          { x: 150, y: 650, size: 12, font }
        );
        page.drawText(formData.address, { x: 150, y: 620, size: 12, font });
        page.drawText(formData.birthdate, { x: 150, y: 590, size: 12, font });
        page.drawText(formData.age.toString(), {
          x: 400,
          y: 590,
          size: 12,
          font,
        });
        page.drawText(formData.birthplace, { x: 150, y: 560, size: 12, font });
        page.drawText(formData.gender, { x: 150, y: 530, size: 12, font });
        page.drawText(formData.civilStatus, {
          x: 400,
          y: 530,
          size: 12,
          font,
        });
        page.drawText(formData.companyName, {
          x: 150,
          y: 500,
          size: 12,
          font,
        });
        page.drawText(formData.purpose, { x: 150, y: 470, size: 12, font });
        page.drawText(formData.validIdType, { x: 150, y: 440, size: 12, font });
        page.drawText(formData.validIdNumber, {
          x: 400,
          y: 440,
          size: 12,
          font,
        });

        if (formData.signature) {
          const pngImage = await pdfDoc.embedPng(formData.signature);
          page.drawImage(pngImage, {
            x: 90,
            y: 300,
            width: 200,
            height: 80,
          });
        }

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        setPdfUrl(URL.createObjectURL(pdfBlob));
      } catch (err) {
        console.error("Error generating PDF:", err);
      }
    };

    generatePdf();
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, signature: dataUrl }));
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setFormData((prev) => ({ ...prev, signature: "" }));
    }
  };

  return (
    <div className="flex flex-col-2 sm:flex-col gap-6 p-6 pt-40">
        <Header />
      {/* Form */}
      <form className="w-1/2 sm:w-1/3 bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Drug Test Form</h2>

        {/* Two-column grid inside form */}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />
          </div>

          <input
            type="text"
            name="birthplace"
            placeholder="Birthplace"
            value={formData.birthplace}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Civil Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Purpose of Drug Test</option>
            <option value="Pre-employment">Pre-employment</option>
            <option value="Random">Random</option>
            <option value="Return-to-duty">Return-to-duty</option>
            <option value="Follow-up">Follow-up</option>
          </select>

          <div className="grid grid-cols-2 gap-2">
            <select
              name="validIdType"
              value={formData.validIdType}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Valid ID Type</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
              <option value="SSS">SSS</option>
              <option value="PhilHealth">PhilHealth</option>
              <option value="Voter's ID">Voter's ID</option>
            </select>
            <input
              type="text"
              name="validIdNumber"
              placeholder="ID Number"
              value={formData.validIdNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Signature */}
        <div>
          <p className="font-semibold mb-2">Signature</p>
          <canvas
            ref={canvasRef}
            className="border rounded"
          ></canvas>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={saveSignature}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={clearSignature}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* PDF Preview */}
      <div className="flex-1 w-1/2 bg-gray-100 shadow-lg rounded-xl p-4">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            className="w-full h-[800px] border rounded"
          />
        ) : (
          <p className="text-gray-500 flex items-center justify-center h-full">
            PDF preview will appear here...
          </p>
        )}
      </div>
    </div>
  );
}

export default LivePdfForm;
