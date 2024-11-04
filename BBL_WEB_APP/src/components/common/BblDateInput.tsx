import { SxProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type BblDateInputProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
  sx?: SxProps;
  disabled?: boolean;
  required?: boolean;
  nextDateDisabled?: boolean;
};

export default function BblDateInput({
  label,
  value,
  onChange,
  disabled,
  required,
  nextDateDisabled = false,
  sx,
}: BblDateInputProps) {
  const handleDateChange = (dateData?: any) => {
    // Tarih string'ini ISO 8601 formatına dönüştür
    if (dateData) {
      const dateString = dayjs(dateData).toDate();
      const date = new Date(dateString);
      const isoDate = date.toISOString();
      onChange(isoDate);
    } else {
      onChange("");
    }
  };

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const formattedDate = dayjs(isoDate);
    return formattedDate;
  };

  return (
    <DatePicker
      label={label}
      value={formatDate(value) || null}
      onChange={(newValue) => handleDateChange(newValue)}
      maxDate={nextDateDisabled ? dayjs() : undefined}
      sx={{
        ...sx,
        my: 1,
        width: "100%",
        boxShadow: "0px 0px 5px rgba(49, 79, 124, 0.1)",
        borderRadius: "8px",
        //label text color
        "& .MuiFormLabel-root": {
          mt: -0.75,
        },
        //input base height 40px
        "& .MuiInputBase-root": {
          height: "40px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E5E5E5",
          },
          "&:hover fieldset": {
            borderColor: "#E5E5E5",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#E5E5E5",
          },
        },
      }}
    />
  );
}
