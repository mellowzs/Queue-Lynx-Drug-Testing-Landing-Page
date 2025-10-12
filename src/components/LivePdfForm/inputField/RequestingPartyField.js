import React from "react";

export default function RequestingPartyField({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <div>
      <p className="font-semibold mb-2">Requesting Party</p>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className={getInputClass("companyName")}
        required
      />
      {/* ⚠️ Error Message */}
      {errorField === "companyName" && (
        <p className="text-red-600 text-[12px] mt-1">
          ⚠️ Please enter a company name.
        </p>
      )}
    </div>
  );
}
