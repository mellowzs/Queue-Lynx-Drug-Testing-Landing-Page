import React from "react";

export default function GenderAndStatus({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <>
      <p className="font-semibold mb-2">Gender and Civil Status</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={getInputClass("gender")}
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {/* ⚠️ Error Message */}
          {errorField === "gender" && (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please select a Gender.
            </p>
          )}
        </div>

        <div>
          <select
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            className={getInputClass("civilStatus")}
            required
          >
            <option value="">Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Divorced">Divorced</option>
          </select>
          {/* ⚠️ Error Message */}
          {errorField === "civilStatus" && (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please select a status.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
