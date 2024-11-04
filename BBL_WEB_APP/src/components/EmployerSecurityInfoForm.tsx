import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { ReactComponent as SecurityIcon } from "../assets/security.svg";
import { AuthContext } from "../contexts/AuthContext";
import { useAlert } from "../hooks/useAlert";
import { changePassword } from "../services/AuthServices";
import SmsVerificationDialog from "./SmsVerificationDialog";
import BblButton from "./common/BblButton";
import BblIcon from "./common/BblIcon";
import BblTextInput from "./common/BblTextInput";

type EmployerSecurityInfoFormProps = {
  values: any;
  handleChange: (value: any) => void;
  handleSubmit: () => void;
  handleBack: () => void;
  loading?: boolean;
};

export default function EmployerSecurityInfoForm({
  loading,
  values,
  handleChange,
  handleSubmit,
  handleBack,
}: EmployerSecurityInfoFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordAgainError, setNewPasswordAgainError] = useState(false);
  const [currentPasswordHelperText, setCurrentPasswordHelperText] =
    useState("");
  const [newPasswordHelperText, setNewPasswordHelperText] = useState("");
  const [newPasswordAgainHelperText, setNewPasswordAgainHelperText] =
    useState("");
  const showSnackbar = useAlert();

  const handleChangePassword = async () => {
    try {
      const res = await changePassword(
        currentPassword,
        newPassword,
        newPasswordAgain,
        token
      );
      if (res.isSuccess) {
        showSnackbar("Şifre değiştirildi.", "success");
      } else {
        showSnackbar("Şifre değiştirilemedi.", "error");
      }
    } catch (err: any) {
      const error = JSON.parse(err.message);
      let newPasswordErrors: string[] = [];
      let newPasswordAgainErrors: string[] = [];
      console.log(error.errors);

      error.errors.forEach((element: string) => {
        if (element.includes("newpassword")) {
          newPasswordErrors.push(element.split(":")[1]);
        }
        if (element.includes("confirmpassword")) {
          newPasswordAgainErrors.push(element.split(":")[1]);
        }
      });

      if (error.message === "Kullanıcı adı veya şifre hatalı") {
        setCurrentPasswordError(true);
        setCurrentPasswordHelperText("Mevcut şifreniz hatalı.");
      }

      if (newPasswordErrors.length > 0) {
        setNewPasswordError(true);
        setNewPasswordHelperText(newPasswordErrors[0]);
      }

      if (newPasswordAgainErrors.length > 0) {
        setNewPasswordAgainError(true);
        setNewPasswordAgainHelperText(newPasswordAgainErrors[0]);
      }

      throw err;
    }
  };

  const handleClose = async (code?: string) => {
    if (code && code.length == 4) {
      setCurrentPasswordError(false);
      setCurrentPasswordHelperText("");
      setNewPasswordError(false);
      setNewPasswordHelperText("");
      setNewPasswordAgainError(false);
      setNewPasswordAgainHelperText("");
      try {
        if (newPassword.length > 0) {
          await handleChangePassword();
        }
        handleSubmit();
      } catch (err: any) {
        console.log(err.errors);
        showSnackbar("Bir sorun oluştu", "error");
      }
    }
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPassword.length > 0) {
      if (newPassword === newPasswordAgain) {
        setOpen(true);
      } else {
        showSnackbar("Şifreler eşleşmiyor.", "error");
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Paper
          sx={{
            p: matches ? 3 : 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <BblIcon Icon={SecurityIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: "bold",
                  fontSize: "21px",
                }}
              >
                Güvenlik Bilgileri
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                Hesabınızın güvenlik bilgilerini giriniz.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 4,
              gap: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: 400,
              }}
            >
              <BblTextInput
                required
                label="E-posta"
                value={values.email}
                onChange={(e) => {
                  handleChange({ email: e.target.value });
                }}
              />
              <Typography fontWeight={500}>
                Şifrenizi değiştirmek için bu bölümü kullanabilirsiniz:
              </Typography>

              <BblTextInput
                // required={
                //   currentPassword.length > 0 ||
                //   newPassword.length > 0 ||
                //   newPasswordAgain.length > 0
                // }
                label="Mevcut Şifre"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                type="password"
                isFalse={currentPasswordError}
                helperText={currentPasswordHelperText}
              />
              <BblTextInput
                // required={
                //   currentPassword.length > 0 ||
                //   newPassword.length > 0 ||
                //   newPasswordAgain.length > 0
                // }
                label="Yeni Şifre"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="password"
                isFalse={newPasswordError}
                helperText={newPasswordHelperText}
              />
              <BblTextInput
                // required={
                //   currentPassword.length > 0 ||
                //   newPassword.length > 0 ||
                //   newPasswordAgain.length > 0
                // }
                label="Şifre Tekrar"
                value={newPasswordAgain}
                onChange={(e) => {
                  setNewPasswordAgain(e.target.value);
                }}
                type="password"
                isFalse={newPasswordAgainError}
                helperText={newPasswordAgainHelperText}
              />
            </Box>
          </Box>
        </Paper>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {matches && (
            <Typography fontWeight={500}>
              Değişiklikleri kaydetmek için sms doğrulaması gerekmektedir!
            </Typography>
          )}
          <BblButton
            variant="outlined"
            onClick={() => {
              handleBack();
            }}
            label="Geri"
            sx={{
              width: 126,
            }}
          />
          <BblButton
            loading={loading}
            type="submit"
            variant="contained"
            label="Kaydet"
            sx={{
              width: 126,
            }}
          />
        </Box>
        <SmsVerificationDialog
          phoneNumber={values.phoneNumber}
          open={open}
          onClose={handleClose}
        />
      </form>
    </Box>
  );
}
