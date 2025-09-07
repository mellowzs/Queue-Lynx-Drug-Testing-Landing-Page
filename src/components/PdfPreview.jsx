// src/components/PdfPreview.js
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PdfPreview({ pdfUrl }) {
  if (!pdfUrl) return null;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="flex-1 h-full sm:w-full bg-gray-100 shadow-lg rounded-xl p-4">
      <div className="flex gap-10 mb-4 sm:mb-0 justify-center">
        {/* Open Button */}
        {isMobile ? (
          <button
            onClick={() => window.open(pdfUrl, "_blank")}
            className="bg-blue-600 text-white border border-blue-600 shadow px-4 py-2 rounded"
          >
            Open PDF
          </button>
        ) : (
          <span className="text-gray-600 self-center">Preview below</span>
        )}

        {/* Download Button */}
        <a
          href={pdfUrl}
          download="drug-test-form.pdf"
          className="bg-green-600 text-white border border-green-600 shadow px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>

      {/* Desktop Inline Preview */}
      {!isMobile && (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="w-full h-[1000px] border rounded"
        />
      )}
    </div>
  );
}
