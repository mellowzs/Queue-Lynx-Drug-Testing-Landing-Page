import { fieldDisplayNames } from "./fieldDisplayNames";

export function validateForm(data) {
  const skipFields = ["age", "currentDate", "currentTime", "agreement"];

  for (const key in data) {
    if (skipFields.includes(key)) continue;

    if (key === "otherPurpose" && data.purpose !== "Other") continue;
    if (key === "medicationYes" && data.medication !== "yes") continue;
    if (key === "otherValidId" && data.validIdType !== "other") continue;
    if (key === "companyNameId" && data.validIdType !== "company") continue;

    const value = String(data[key] ?? "").trim();

    if (!value) {
      const displayName = fieldDisplayNames[key] || key || "field";
      return {
        key, // 👈 keep track of which field failed
        message: `⚠️ Please fill out the ${displayName}.`,
      };
    }
  }

  return null; // ✅ no error
}
