import React, { useEffect, useRef, useState, useCallback } from "react";
import SignaturePad from "signature_pad";

function SignaturePadField({ setSignature }) {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [activeTab, setActiveTab] = useState("draw"); // 'draw' or 'upload'
  const [threshold, setThreshold] = useState(220); // background removal level (0–255)
  const [lastFile, setLastFile] = useState(null);

  // Reinitialize signature pad whenever Draw tab is active
  useEffect(() => {
    if (activeTab === "draw" && canvasRef.current) {
      // Set canvas size with proper scaling
      const canvas = canvasRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      signaturePadRef.current = new SignaturePad(canvas, {
        minWidth: 0.5,
        maxWidth: 2.5,
        penColor: "rgb(66, 133, 244)",
        throttle: 16, // Increase smoothness of drawing
        velocityFilterWeight: 0.7, // Adjust line weight based on drawing speed
      });
    }
  }, [activeTab]);

  const saveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL("image/png");
      setSignature(dataUrl);
      setUploadedSignature(null);
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignature("");
      setUploadedSignature(null);
    }
  };

  const processImage = useCallback(
    (file, thresholdValue) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const offCanvas = document.createElement("canvas");
          const ctx = offCanvas.getContext("2d");

          offCanvas.width = img.width;
          offCanvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(
            0,
            0,
            offCanvas.width,
            offCanvas.height
          );
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const brightness = (r + g + b) / 3;

            // Make bright pixels transparent
            if (brightness > thresholdValue) {
              const alpha = 255 - (brightness - thresholdValue) * 5;
              data[i + 3] = alpha < 0 ? 0 : alpha;
            }
          }

          ctx.putImageData(imageData, 0, 0);
          const transparentDataUrl = offCanvas.toDataURL("image/png");

          setUploadedSignature(transparentDataUrl);
          setSignature(transparentDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    [setSignature, setUploadedSignature]
  );

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    setLastFile(file);
    processImage(file, threshold);
  };

  // Re-process image when threshold changes
  useEffect(() => {
    if (lastFile) {
      processImage(lastFile, threshold);
    }
  }, [threshold, lastFile, processImage]);

  const removeUploadedSignature = () => {
    setUploadedSignature(null);
    setSignature("");
    setLastFile(null);
  };

  return (
    <div>
      <p className="font-semibold mb-2">Signature</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("draw")}
          className={`px-3 py-1 rounded ${
            activeTab === "draw" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Draw
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`px-3 py-1 rounded ${
            activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Upload
        </button>
      </div>

      {/* Draw Tab */}
      {activeTab === "draw" && (
        <div>
          <canvas
            ref={canvasRef}
            className="border rounded w-full h-80" // Increased height to h-80 (320px)
            style={{
              touchAction: "none", // Prevents scrolling while signing on touch devices
              maxWidth: "100%",
              maxHeight: "400px",
            }}
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
      )}

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-600"
          />

          {/* Show slider only when image is uploaded */}
          {uploadedSignature && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Adjust background removal:
              </p>
              <input
                type="range"
                min="150"
                max="255"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Threshold: {threshold} (lower = more aggressive removal)
              </p>

              <img
                src={uploadedSignature}
                alt="Uploaded Signature"
                className="border rounded max-h-40 mt-2 bg-transparent"
              />

              <button
                type="button"
                onClick={removeUploadedSignature}
                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Remove Uploaded Signature
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SignaturePadField;
