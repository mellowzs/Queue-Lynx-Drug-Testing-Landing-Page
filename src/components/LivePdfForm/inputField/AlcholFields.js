import React from "react";

export default function AlcholFields({
  formData,
  handleChange,
  errorField,
}) {
  return (
    <div>
      <div className="mb-4">
        <p className="font-semibold mb-2">
          Have you ingested any alcoholic beverage in the past 24 hours?
        </p>

        <div
          className={`grid grid-cols-2 gap-2 p-2 rounded border ${
            errorField === "alcohol"
              ? "border border-red-600 p-5 bg-red-200 animate-[shake_0.3s_ease-in-out] rounded-xl"
              : ""
          }`}
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="alcohol"
              value="yes"
              checked={formData.alcohol === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="alcohol"
              value="no"
              checked={formData.alcohol === "no"}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {errorField === "alcohol" && (
          <p className="text-red-600 text-sm mt-1">
            ⚠️ Please indicate if you’ve consumed alcohol.
          </p>
        )}
      </div>
    </div>
  );
}
