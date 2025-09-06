import React from "react";

function PdfPreview({ pdfUrl }) {
  return (
    <div className="flex-1 w-1/2 sm:w-full bg-gray-100 shadow-lg rounded-xl p-4">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="w-full h-[900px] border rounded"
        />
      ) : (
        <p className="text-gray-500 flex items-center justify-center h-full">
          PDF preview will appear here...
        </p>
      )}
    </div>
  );
}

export default PdfPreview;
