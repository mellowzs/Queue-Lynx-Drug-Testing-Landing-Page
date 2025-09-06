import React, { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

function SignaturePadField({ setSignature }) {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        minWidth: 1,
        maxWidth: 1,
        penColor: "rgb(66, 133, 244)",
      });
    }
  }, []);

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL("image/png");
      setSignature(dataUrl);
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignature("");
    }
  };

  return (
    <div>
      <p className="font-semibold mb-2">Signature</p>
      <canvas ref={canvasRef} className="border rounded"></canvas>
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
  );
}

export default SignaturePadField;
