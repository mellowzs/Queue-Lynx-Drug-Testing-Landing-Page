import React from "react";

export default function MedicationFields({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <div>
      <p className="font-semibold mb-2">
        Have you taken medication/drugs in the past 30 days?
      </p>

      <div
        className={`grid grid-cols-2 gap-2 p-2 rounded border ${
          errorField === "medication"
            ? "border border-red-600 p-5 bg-red-200 animate-[shake_0.3s_ease-in-out] rounded-xl"
            : ""
        }`}
      >
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="medication"
            value="yes"
            checked={formData.medication === "yes"}
            onChange={handleChange}
          />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="medication"
            value="no"
            checked={formData.medication === "no"}
            onChange={handleChange}
          />
          No
        </label>
      </div>

      {errorField === "medication" && (
        <p className="text-red-600 text-sm mt-1">
          ⚠️ Please indicate if you’ve taken any medication or drugs in past 30 days.
        </p>
      )}

      {formData.medication === "yes" && (
        <div className="mt-2">
          <p className="font-semibold mb-1">
            If yes, please specify (separated by commas):
          </p>
          <input
            type="text"
            name="medicationYes"
            placeholder="Please specify"
            value={formData.medicationYes || ""}
            onChange={handleChange}
            className={getInputClass("medicationYes")}
          />
          {errorField === "medicationYes" && (
            <p className="text-red-600 text-sm mt-1">
              ⚠️ Please specify your medication(s).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
