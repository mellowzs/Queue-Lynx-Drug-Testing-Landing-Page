import React from "react";

export default function ValidIdFields({
  formData,
  handleChange,
  getInputClass,
  errorField,
}) {
  return (
    <div>
      <p className="font-semibold mb-2">Valid ID</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
        <div>
          <select
            name="validIdType"
            value={formData.validIdType || ""}
            onChange={handleChange}
            className={getInputClass("validIdType")}
            required
          >
            <option value="">Select Valid ID</option>
            <option value="passport">Passport</option>
            <option value="drivers">Driver's License</option>
            <option value="umid">UMID</option>
            <option value="philhealth">PhilHealth ID</option>
            <option value="sss">SSS ID</option>
            <option value="postal">Postal ID</option>
            <option value="voters">Voter's ID</option>
            <option value="prc">PRC ID</option>
            <option value="national">National ID</option>
            <option value="company">Company ID</option>
            <option value="other">Other</option>
          </select>
          {/* ⚠️ Error Message */}
          {errorField === "validIdType" && (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please select a ID type.
            </p>
          )}
        </div>

        <div>
          {formData.validIdType === "other" && (
            <input
              type="text"
              name="otherValidId"
              placeholder="Please specify ID Type"
              value={formData.otherValidId || ""}
              onChange={handleChange}
              className={getInputClass("otherValidId")}
            />
          )}
          {formData.validIdType === "company" && (
            <input
              type="text"
              name="companyNameId"
              placeholder="Please specify Company Name"
              value={formData.companyNameId || ""}
              onChange={handleChange}
              className={getInputClass("companyNameId")}
            />
          )}
          {/* ⚠️ Error Messages */}
          {errorField === "otherValidId" ? (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please provide an ID type.
            </p>
          ) : errorField === "companyNameId" ? (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please provide a company ID name.
            </p>
          ) : null}
        </div>

        <div>
          <input
            type="text"
            name="validIdNumber"
            placeholder="ID Number"
            value={formData.validIdNumber || ""}
            onChange={handleChange}
            className={getInputClass("validIdNumber")}
            required
          />
          {/* ⚠️ Error Message */}
          {errorField === "validIdNumber" && (
            <p className="text-red-600 text-[12px] mt-1">
              ⚠️ Please enter an ID number.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
