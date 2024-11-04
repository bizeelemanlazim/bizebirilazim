import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import BblIcon from "./common/BblIcon";
import { ReactComponent as MobileIcon } from "../assets/device-mobile.svg";
import BblButton from "./common/BblButton";
import { formatTurkishPhoneNumber } from "../utils/utils";

type SmsVerificationDialogProps = {
  open: boolean;
  onClose: (code?: string) => void;
  phoneNumber: string;
};

export default function SmsVerificationDialog({
  open,
  onClose,
  phoneNumber,
}: SmsVerificationDialogProps) {
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const updatedVerificationCode = [...verificationCode];
      updatedVerificationCode[index] = value;
      setVerificationCode(updatedVerificationCode);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const updatedVerificationCode = [...verificationCode];
      updatedVerificationCode[index] = "";
      setVerificationCode(updatedVerificationCode);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleCancel = () => {
    setVerificationCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    onClose();
  };

  const handleConfirm = () => {
    const codes = verificationCode.join("");
    onClose(codes);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BblIcon Icon={MobileIcon} />
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          maxHeight: "320px",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 17,
            color: "#101828",
            fontFamily: "Quicksand",
          }}
        >
          SMS DOĞRULAMA
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#667085",
            textAlign: "center",
          }}
        >
          {formatTurkishPhoneNumber(phoneNumber)} nolu telefonunuza
          gönderdiğimiz 4 haneli doğrulama kodunu giriniz
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          {verificationCode.map((digit, index) => (
            <TextField
              key={index}
              sx={{
                background: "#ffffff",
                maxWidth: "80px",
                width: "100%",
                aspectRatio: 1,
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "60px",
                textAlign: "center",
                letterSpacing: "-0.02em",
                color: "rgba(7, 148, 208, 1)",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  fontSize: "48px",
                  fontWeight: "500",
                  color: "#0794D0",
                  padding: 1,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0794D0",
                    borderRadius: "12px",
                  },
                },
                marginLeft: "10px",
              }}
              type="text"
              value={digit}
              onChange={(event) =>
                handleVerificationCodeChange(index, event.target.value)
              }
              onKeyDown={(event) => handleBackspace(index, event)}
              inputRef={(ref) => (inputRefs.current[index] = ref)}
              variant="outlined"
            />
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{
            marginTop: 1,
          }}
        >
          Bir kod almadınız mı?{" "}
          <a href="#" style={{ color: "#0794D0", textDecoration: "none" }}>
            Tekrar göndermek için tıklayın.
          </a>
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <BblButton
          label="İptal Et"
          onClick={handleCancel}
          variant="outlined"
          sx={{ width: 160 }}
        />
        <BblButton
          label="Onayla"
          onClick={handleConfirm}
          variant="contained"
          sx={{ width: 160 }}
        />
        {/* <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            width: "173px",
            height: "40px",
            borderRadius: "6px",
            fontFamily: "Quicksand",
            fontWeight: 500,
            fontSize: "17px",
            textAlign: "center",
            textTransform: "none",
            "&:hover": {
              background: "inherit",
            },
          }}
        >
          İptal Et
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            width: "175px",
            height: "40px",
            borderRadius: "6px",
            fontFamily: "Quicksand",
            fontWeight: 500,
            fontSize: "17px",
            textAlign: "center",
            textTransform: "none",
            background: "#0794D0",
            "&:hover": {
              background: "#0794D0",
            },
          }}
        >
          Onayla
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
