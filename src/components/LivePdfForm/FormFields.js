import useFetchAddress from "Hooks/useFetchAddress";
import NameFields from "./inputField/NameFields";
import BirthDetails from "./inputField/BirthDetails";
import AddressFields from "./inputField/AddressFields";
import ValidIdFields from "./inputField/ValidIdFields";
import AlcholFields from "./inputField/AlcholFields";
import DrugtestPurpose from "./inputField/DrugtestPurpose";
import MedicationFields from "./inputField/MedicationFields";
import GenderAndStatus from "./inputField/GenderAndStatus";
import RequestingPartyField from "./inputField/RequestingPartyField";

function FormFields({ formData, handleChange, errorField }) {
  const {
    locations,
    loading,
    regionList,
    provinceList,
    cityList,
    barangayList,
    birthProvinceList,
    birthCityList,
  } = useFetchAddress(formData);

  const baseInputClass = "border p-2 rounded w-full";

  const getErrorClass = (errorField, fieldName) =>
    errorField === fieldName
      ? "border-red-600 bg-red-200 animate-[shake_0.3s_ease-in-out]"
      : "";

  const getInputClass = (fieldName) =>
    `${baseInputClass} ${getErrorClass(errorField, fieldName)}`;

  return (
    <form>
      <div className="grid grid-cols-1 gap-4 sm:text-xs">
        {/* Client's Name */}
        <NameFields
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />
        <hr className="pb-1 bg-black/50 rounded" />

        {/* Gender & Civil Status */}
        <GenderAndStatus
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />
        <hr className="pb-1 bg-black/50 rounded" />

        {/* Birthdate */}
        <BirthDetails
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
          regionList={regionList}
          birthProvinceList={birthProvinceList}
          birthCityList={birthCityList}
          locations={locations}
          loading={loading}
        />
        <hr className="pb-1 bg-black/50 rounded" />

        {/* Valid Id */}
        <ValidIdFields
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />
        <hr className="pb-1 bg-black/50 rounded" />

        {/* Requesting Party */}
        <RequestingPartyField
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />

        {/* Purpose of Drug Test */}
        <DrugtestPurpose
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />
        <hr className="pb-1 bg-black/50 rounded" />

        {/* Medication/Drugs in past 30 days */}
        <MedicationFields
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
        />

        <hr className="pb-1 bg-black/50 rounded mb-4" />

        {/* Alcohol Consumption */}
        <AlcholFields
          formData={formData}
          handleChange={handleChange}
          errorField={errorField}
        />

        <hr className="pb-1 bg-black/50 rounded mb-4" />

        {/* Client Address */}
        <AddressFields
          formData={formData}
          handleChange={handleChange}
          getInputClass={getInputClass}
          errorField={errorField}
          regionList={regionList}
          provinceList={provinceList}
          cityList={cityList}
          barangayList={barangayList}
          locations={locations}
          loading={loading}
        />
        <hr className="pb-1 bg-black/50 rounded mb-4" />
      </div>
    </form>
  );
}

export default FormFields;
