import { format } from "date-fns";

export const formatDateRange = (startDate: string, endDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const startFormatted = new Date(startDate).toLocaleDateString(
    "tr-TR",
    options
  );
  const endFormatted = new Date(endDate).toLocaleDateString("tr-TR", options);

  return `${startFormatted} - ${endFormatted}`;
};

export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(date).toLocaleDateString("tr-TR", options);
};

export const convertTimeToHours = (timeString: string): string => {
  const parts = timeString.split(":");
  if (parts.length < 2) {
    throw new Error("Geçersiz zaman formatı");
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10) / 60;

  let result = "";
  if (hours) result += `${hours} saat `;
  if (minutes) result += `${minutes} dakika`;

  return result;
};

export const formatTime = (timeString: string): string => {
  const parts = timeString.split(":");
  if (parts.length < 2) {
    throw new Error("Geçersiz zaman formatı");
  }

  // Saat ve dakika kısımlarını al
  const hours = parts[0];
  const minutes = parts[1];

  return `${hours}:${minutes}`;
};

export const getValidationErrors = (errors?: Array<string>): string => {
  if (!errors || errors.length === 0) {
    return "";
  }
  
  const validationErrors = [];
  for (const error of errors) {
    const message = error.split(" : ")[1];
    validationErrors.push(message);
  }

  // debugger;

  return validationErrors.join("");
};

export const formatTurkishPhoneNumber = (phoneNumber: string) => {
  let cleaned = ("" + phoneNumber).replace(/\D/g, "");

  if (cleaned.length === 10) {
    let formatted = cleaned.replace(
      /(\d{3})(\d{3})(\d{2})(\d{2})/,
      "($1) $2 $3 $4"
    );
    return formatted;
  } else {
    return "Geçersiz telefon numarası";
  }
};
