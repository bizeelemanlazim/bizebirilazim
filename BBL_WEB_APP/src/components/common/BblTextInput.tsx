import { Box, SxProps, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { getValidationErrors } from "../../utils/utils";
import BblMaskedInput from "./BblMaskedInput";

type BblTextInputProps = {
  name?: string;
  mask?: string;
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  sx?: SxProps;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
  length?: number;
  isFalse?: boolean;
  placeholder?: string;
  helperText?: string;
  useFormik?: any;
};

export default function BblTextInput({
  name,
  mask,
  helperText,
  placeholder,
  length,
  isFalse,
  label,
  value,
  onChange,
  sx,
  type = "text",
  required,
  multiline,
  rows,
  autoComplete,
  useFormik,
}: BblTextInputProps) {

  return (
    <Box
      sx={{
        width: "100%",
        height: 70,
      }}
    >
      <TextField
        name={name}
        type={type}
        error={
          (useFormik?.touched[name || ""] && useFormik?.errors[name || ""]) ||
          isFalse
        }
        InputProps={{
          inputComponent: BblMaskedInput,
          inputProps: { mask },
        }}
        required={required}
        multiline={multiline}
        placeholder={placeholder}
        helperText={
          helperText ||
          (useFormik?.touched[name || ""] && useFormik?.errors[name || ""]) ||
          (isFalse && `En az ${length} karakter girmelisiniz.`)
        }
        rows={rows}
        label={label}
        autoComplete={autoComplete}
        variant="outlined"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        onBlur={useFormik?.handleBlur}
        value={useFormik?.values[name || ""] || ""}
        onChange={useFormik.handleChange} // onChange={(e: any) => {
        //   e.target.value =
        //     typeof mask !== "undefined"
        //       ? (e?.target?.value || "").replace(/\D/g, "")
        //       : e?.target?.value;

        //   if (typeof onChange !== "undefined") {
        //     onChange(e);
        //   }

        //   useFormik?.handleChange();
        // }}
        sx={{
          ...sx,
          my: 1,
          width: "100%",
          boxShadow: "0px 0px 5px rgba(49, 79, 124, 0.1)",
          borderRadius: "8px",
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
    </Box>
  );
}
