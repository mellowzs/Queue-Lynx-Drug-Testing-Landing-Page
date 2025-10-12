import React from "react";

export default function AddressFields({
  formData,
  handleChange,
  getInputClass,
  errorField,
  regionList,
  provinceList,
  cityList,
  barangayList,
  locations,
  loading,
}) {
  return (
    <div>
      <p className="font-semibold mb-4">Client's Address</p>
      {!loading && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <select
              name="region"
              value={formData.region || ""}
              onChange={handleChange}
              className={getInputClass("region")}
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
            {errorField === "region" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a region.
              </p>
            )}
          </div>

          <div>
            <select
              name="province"
              value={formData.province || ""}
              onChange={handleChange}
              disabled={!formData.region}
              className={getInputClass("province")}
              required
            >
              <option value="">Select Province</option>
              {provinceList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "province" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a province.
              </p>
            )}
          </div>

          <div>
            <select
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              disabled={!formData.province}
              className={getInputClass("city")}
              required
            >
              <option value="">Select City/Municipality</option>
              {cityList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "city" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a city or municipality.
              </p>
            )}
          </div>

          <div>
            <select
              name="barangay"
              value={formData.barangay || ""}
              onChange={handleChange}
              disabled={!formData.city}
              className={getInputClass("barangay")}
              required
            >
              <option value="">Select Barangay</option>
              {barangayList.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {/* ⚠️ Error Message */}
            {errorField === "barangay" && (
              <p className="text-red-600 text-[12px] mt-1">
                ⚠️ Please select a barangay.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
