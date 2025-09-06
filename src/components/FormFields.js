import React from "react";

function FormFields({ formData, handleChange }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          id="birthdate"
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
      </div>

      <input
        type="text"
        name="birthplace"
        placeholder="Birthplace"
        value={formData.birthplace}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          name="civilStatus"
          value={formData.civilStatus}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Civil Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      {/* Purpose of Drug Test */}
      <div>
        <p className="font-semibold mb-2">Purpose of Drug Test</p>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Pre-employment"
              checked={formData.purpose === "Pre-employment"}
              onChange={handleChange}
            />
            Pre-employment
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Random"
              checked={formData.purpose === "Random"}
              onChange={handleChange}
            />
            Random
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Return-to-duty"
              checked={formData.purpose === "Return-to-duty"}
              onChange={handleChange}
            />
            Return-to-duty
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Follow-up"
              checked={formData.purpose === "Follow-up"}
              onChange={handleChange}
            />
            Follow-up
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Reasonable suspicion/cause"
              checked={formData.purpose === "Reasonable suspicion/cause"}
              onChange={handleChange}
            />
            Reasonable suspicion/cause
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="Others"
              checked={formData.purpose === "Others"}
              onChange={handleChange}
            />
            Others (pls. specify)
          </label>
        </div>

        {/* If "Others" is chosen, show a text field */}
        {formData.purpose === "Others" && (
          <input
            type="text"
            name="otherPurpose"
            placeholder="Please specify purpose"
            value={formData.otherPurpose || ""}
            onChange={handleChange}
            className="mt-2 border p-2 rounded w-full"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          name="validIdType"
          value={formData.validIdType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Valid ID Type</option>
          <option value="Passport">Passport</option>
          <option value="Driver's License">Driver's License</option>
          <option value="SSS">SSS</option>
          <option value="PhilHealth">PhilHealth</option>
          <option value="Voter's ID">Voter's ID</option>
        </select>
        <input
          type="text"
          name="validIdNumber"
          placeholder="ID Number"
          value={formData.validIdNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}

export default FormFields;
