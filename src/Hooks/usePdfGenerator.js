// src/hooks/usePdfGenerator.js
import { useState, useCallback } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { formatDateMMDDYY } from "../Utils/FormatDate";
import { color } from "framer-motion";

export function usePdfGenerator() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = useCallback(async (formData) => {
    try {
      const formUrl = "/Form.pdf"; // must be in /public
      const formPdfBytes = await fetch(formUrl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page = pdfDoc.getPages()[0];

      // Current date (MM/DD/YY)
      const today = new Date();
      const formattedToday = formatDateMMDDYY(today.toISOString());

      const purposes = [
        { label: "Pre-employment", value: "Pre-employment", x: 75, y: 505 },
        { label: "Return-to-duty", value: "Return-to-duty", x: 75, y: 492 },
        { label: "Random", value: "Random", x: 215, y: 505 },
        { label: "Follow-up", value: "Follow-up", x: 215, y: 492 },
        { label: "Reasonable suspicion/cause", value: "Reasonable suspicion/cause", x: 321, y: 505 },
        { label: "Others", value: "Others", x: 321, y: 492 },
      ];

      // Draw checkboxes
      purposes.forEach((purpose) => {
        // Draw empty checkbox
        page.drawRectangle({
          x: purpose.x,
          y: purpose.y,
          width: 12,
          height: 12,
          borderColor: color.black,
          borderWidth: 1.5,
        });

        // If selected, draw an "X"
        if (formData.purpose === purpose.value) {
          page.drawText("X", {
            x: purpose.x + 2,
            y: purpose.y + 1,
            size: 15,
            font,
          });
        }
      });

      page.drawText(formattedToday, {
        x: 475, // adjust X position
        y: 640, // adjust Y position
        size: 12,
        font,
      });

      // Example text positions (adjust to match your PDF form layout)
      page.drawText(
        `${formData.lastName}, ${formData.firstName} ${formData.middleName}`,
        { x: 130, y: 640, size: 12, font }
      );
      page.drawText(formData.address, { x: 240, y: 105, size: 12, font });
      page.drawText(formatDateMMDDYY(formData.birthdate), {
        x: 330,
        y: 600,
        size: 12,
        font,
      });
      page.drawText(formData.age.toString(), { x: 90, y: 600, size: 12, font });
      page.drawText(formData.birthplace, { x: 220, y: 575, size: 12, font });
      page.drawText(formData.gender, { x: 185, y: 600, size: 12, font });
      page.drawText(formData.civilStatus, { x: 510, y: 600, size: 12, font });
      page.drawText(formData.companyName, { x: 150, y: 535, size: 12, font });
      // If "Others" is chosen, print the text the user entered
      if (formData.purpose === "Others" && formData.otherPurpose) {
        page.drawText(formData.otherPurpose, {
          x: 470, // adjust position near "Others"
          y: 497,
          size: 12,
          font,
        });
      }
      page.drawText(formData.validIdType, { x: 150, y: 440, size: 12, font });
      page.drawText(formData.validIdNumber, { x: 400, y: 440, size: 12, font });

      page.drawText(
        `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
        { x: 160, y: 155, size: 12, font }
      );
      if (formData.signature) {
        const pngImage = await pdfDoc.embedPng(formData.signature);
        page.drawImage(pngImage, { x: 200, y: 90, width: 200, height: 80 });
      }

      page.drawText(formattedToday, {
        x: 200, // adjust X position
        y: 80, // adjust Y position
        size: 12,
        font,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(pdfBlob));
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  }, []);

  return { pdfUrl, generatePdf };
}
