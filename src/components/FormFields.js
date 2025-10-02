import React, { useEffect, useState, useMemo } from "react";
import DateInput from './DateInput';

function FormFields({ formData, handleChange, fieldErrors = {} }) {
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);

  // Helper function to render label with error
  const renderLabel = (htmlFor, label) => (
    <div className="flex items-center gap-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {fieldErrors[htmlFor] && (
        <span className="text-red-500 text-xs">{fieldErrors[htmlFor]}</span>
      )}
    </div>
  );

  useEffect(() => {
    fetch("/Address.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading Address.json:", err);
        setLoading(false);
      });
  }, []);

  // ----------- ADDRESS LISTS ------------
  const regionList = useMemo(() => Object.keys(locations).sort(), [locations]);

  const provinceList = useMemo(() => {
    if (!formData.region || !locations[formData.region]) return [];
    return Object.keys(locations[formData.region].province_list).sort();
  }, [locations, formData.region]);

  const cityList = useMemo(() => {
    if (!formData.region || !formData.province) return [];
    return Object.keys(
      locations[formData.region]?.province_list[formData.province]
        ?.municipality_list || {}
    ).sort();
  }, [locations, formData.region, formData.province]);

  const barangayList = useMemo(() => {
    if (!formData.region || !formData.province || !formData.city) return [];
    return (
      locations[formData.region]?.province_list[formData.province]
        ?.municipality_list[formData.city]?.barangay_list || []
    );
  }, [locations, formData.region, formData.province, formData.city]);

  // ----------- BIRTHPLACE LISTS ------------
  const birthProvinceList = useMemo(() => {
    if (!formData.birthRegion || !locations[formData.birthRegion]) return [];
    return Object.keys(locations[formData.birthRegion].province_list).sort();
  }, [locations, formData.birthRegion]);

  const birthCityList = useMemo(() => {
    if (!formData.birthRegion || !formData.birthProvince) return [];
    return Object.keys(
      locations[formData.birthRegion]?.province_list[formData.birthProvince]
        ?.municipality_list || {}
    ).sort();
  }, [locations, formData.birthRegion, formData.birthProvince]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:text-xs">
      {/* Client's Name */}
      <p className="font-semibold mb-2">Client's Name</p>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
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
        required
      />
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Birthdate */}
      <p className="font-semibold mb-2">Birthdate</p>
      <div className="grid grid-cols-2 gap-2">
        <DateInput
          value={formData.birthdate}
          onChange={handleChange}
          required
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
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Gender & Civil Status */}
      <div className="grid grid-cols-2 gap-2">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
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
          required
        >
          <option value="">Civil Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Birthplace */}
      <p className="font-semibold mb-2">Birth Place</p>
      {!loading && (
        <>
          <select
            name="birthRegion"
            value={formData.birthRegion || ""}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Region</option>
            {regionList.map((r) => (
              <option key={r} value={r}>
                {locations[r].region_name || r}
              </option>
            ))}
          </select>

          <select
            name="birthProvince"
            value={formData.birthProvince || ""}
            onChange={handleChange}
            disabled={!formData.birthRegion}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Province</option>
            {birthProvinceList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="birthCity"
            value={formData.birthCity || ""}
            onChange={handleChange}
            disabled={!formData.birthProvince}
            className="border p-2 rounded"
            required
          >
            <option value="">Select City/Municipality</option>
            {birthCityList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
      )}
      <hr className="pb-1 bg-black/50 rounded" />

      <div>
        <p className="font-semibold mb-2">Valid ID</p>
        <select
          name="validIdType"
          value={formData.validIdType || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
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

        {formData.validIdType === "other" && (
          <input
            type="text"
            name="otherValidId"
            placeholder="Please specify ID Type"
            value={formData.otherValidId || ""}
            onChange={handleChange}
            className="mt-2 border p-2 rounded w-full"
          />
        )}

        {formData.validIdType === "company" && (
          <input
            type="text"
            name="companyNameId"
            placeholder="Please specify Company Name"
            value={formData.companyNameId || ""}
            onChange={handleChange}
            className="mt-2 border p-2 rounded w-full"
          />
        )}

        <input
          type="text"
          name="validIdNumber"
          placeholder="ID Number"
          value={formData.validIdNumber || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-2"
          required
        />
      </div>
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Requesting Party */}
      <p className="font-semibold mb-2">Requesting Party</p>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <hr className="pb-1 bg-black/50 rounded" />

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
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Medication/Drugs in past 30 days */}
      <p className="font-semibold">Have you taken medication/drugs in the past 30 days?</p>
      <div className="grid grid-cols-2 gap-2">
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
      {formData.medication === "yes" && (
        <>
          <p className="font-semibold">If yes, please specify (separated by commas):</p>
          <input
            type="text"
            name="medicationYes"
            placeholder="Please specify"
            value={formData.medicationYes || ""}
            onChange={handleChange}
            className="mt-2 border p-2 rounded w-full"
          />
        </>
      )}
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Alcohol Consumption */}
      <p className="font-semibold">Have ingested any alcholic beverage in the past 24 hours?</p>
      <div className="grid grid-cols-2 gap-2">
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
      <hr className="pb-1 bg-black/50 rounded" />

      {/* Client Address */}
      <p className="font-semibold mb-2">Client's Address</p>
      {!loading && (
        <>
          <select
            name="region"
            value={formData.region || ""}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Region</option>
            {regionList.map((r) => (
              <option key={r} value={r}>
                {locations[r].region_name || r}
              </option>
            ))}
          </select>

          <select
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
            disabled={!formData.region}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Province</option>
            {provinceList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            disabled={!formData.province}
            className="border p-2 rounded"
            required
          >
            <option value="">Select City/Municipality</option>
            {cityList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="barangay"
            value={formData.barangay || ""}
            onChange={handleChange}
            disabled={!formData.city}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Barangay</option>
            {barangayList.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </>
      )}
      <hr className="pb-1 bg-black/50 rounded" />
    </div>
  );
}

export default FormFields;
