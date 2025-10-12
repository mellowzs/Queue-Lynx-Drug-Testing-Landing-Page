import React from "react";
import DateInput from "../../DateInput";

export default function BirthDetails({
  formData,
  handleChange,
  getInputClass,
  errorField,
  regionList,
  birthProvinceList,
  birthCityList,
  locations,
  loading,
}) {
  return (
    <>
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

      <p className="font-semibold mb-2">Birth Place</p>
      {!loading && (
        <>
          <div>
            <select
              name="birthRegion"
              value={formData.birthRegion || ""}
              onChange={handleChange}
              className={getInputClass("birthRegion")}
              required
            >
              <option value="">Select Region</option>
              {regionList.map((r) => (
                <option key={r} value={r}>
                  {locations[r].region_name || r}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "birthRegion" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a region.
              </p>
            )}
          </div>

          <div>
            <select
              name="birthProvince"
              value={formData.birthProvince || ""}
              onChange={handleChange}
              disabled={!formData.birthRegion}
              className={getInputClass("birthProvince")}
              required
            >
              <option value="">Select Province</option>
              {birthProvinceList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "birthProvince" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a province.
              </p>
            )}
          </div>

          <div>
            <select
              name="birthCity"
              value={formData.birthCity || ""}
              onChange={handleChange}
              disabled={!formData.birthProvince}
              className={getInputClass("birthCity")}
              required
            >
              <option value="">Select City/Municipality</option>
              {birthCityList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "birthCity" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a city or municipality.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
