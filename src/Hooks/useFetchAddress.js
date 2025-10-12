import { useEffect, useState, useMemo } from "react";

export default function useFetchAddress(formData) {
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch Address.json once
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
    if (!formData?.region || !locations[formData.region]) return [];
    return Object.keys(locations[formData.region].province_list).sort();
  }, [locations, formData?.region]);

  const cityList = useMemo(() => {
    if (!formData?.region || !formData?.province) return [];
    return Object.keys(
      locations[formData.region]?.province_list[formData.province]
        ?.municipality_list || {}
    ).sort();
  }, [locations, formData?.region, formData?.province]);

  const barangayList = useMemo(() => {
    if (!formData?.region || !formData?.province || !formData?.city) return [];
    return (
      locations[formData.region]?.province_list[formData.province]
        ?.municipality_list[formData.city]?.barangay_list || []
    );
  }, [locations, formData?.region, formData?.province, formData?.city]);

  // ----------- BIRTHPLACE LISTS ------------
  const birthProvinceList = useMemo(() => {
    if (!formData?.birthRegion || !locations[formData.birthRegion]) return [];
    return Object.keys(locations[formData.birthRegion].province_list).sort();
  }, [locations, formData?.birthRegion]);

  const birthCityList = useMemo(() => {
    if (!formData?.birthRegion || !formData?.birthProvince) return [];
    return Object.keys(
      locations[formData.birthRegion]?.province_list[formData.birthProvince]
        ?.municipality_list || {}
    ).sort();
  }, [locations, formData?.birthRegion, formData?.birthProvince]);

  return {
    locations,
    loading,
    regionList,
    provinceList,
    cityList,
    barangayList,
    birthProvinceList,
    birthCityList,
  };
}
