import React from "react";

export default function NameFields({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <>
      <p className="font-semibold mb-2">Client's Name</p>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
        <div className="flex flex-col">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={getInputClass("firstName")}
            required
          />
          {/* ⚠️ Error Message */}
          {errorField === "firstName" && (
            <p className="text-red-600 text-[12px] mt-1 sm:text-xs">
              ⚠️ Please enter your first name.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className={getInputClass("middleName")}
            required
          />
          {/* ⚠️ Error Message */}
          {errorField === "middleName" && (
            <p className="text-red-600 text-[12px] mt-1 sm:text-xs">
              ⚠️ Please enter your middle name.
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={getInputClass("lastName")}
            required
          />
          {/* ⚠️ Error Message */}
          {errorField === "lastName" && (
            <p className="text-red-600 text-[12px] mt-1 sm:text-xs">
              ⚠️ Please enter your last name.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
