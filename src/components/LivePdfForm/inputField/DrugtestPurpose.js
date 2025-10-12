import React from "react";

export default function DrugtestPurpose({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <div>
      <p className="font-semibold mb-2">Purpose of Drug Test</p>
      <div
        className={`grid grid-cols-2 gap-2 p-2 rounded border ${
          errorField === "purpose"
            ? "border border-red-600 p-5 bg-red-200 animate-[shake_0.3s_ease-in-out] rounded-xl"
            : ""
        }`}
      >
        {[
          "Pre-employment",
          "Random",
          "Return-to-duty",
          "Follow-up",
          "Reasonable suspicion/cause",
          "Others",
        ].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value={option}
              checked={formData.purpose === option}
              onChange={handleChange}
            />
            {option === "Others" ? "Others (pls. specify)" : option}
          </label>
        ))}
      </div>

      {/* ⚠️ Error Message */}
      {errorField === "purpose" && (
        <p className="text-red-600 text-sm mt-1">
          ⚠️ Please select a purpose of drug test.
        </p>
      )}

      {/* If "Others" is chosen, show a text field */}
      {formData.purpose === "Others" && (
        <div className="mt-2">
          <input
            type="text"
            name="otherPurpose"
            placeholder="Please specify purpose"
            value={formData.otherPurpose || ""}
            onChange={handleChange}
            className={getInputClass("otherPurpose")}
          />
          {errorField === "otherPurpose" && (
            <p className="text-red-600 text-sm mt-1">
              ⚠️ Please specify your purpose.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
