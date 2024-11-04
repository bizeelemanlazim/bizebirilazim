import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginSlider from "../components/LoginSlider";
import authService from "../services/auth";
import { loginUser } from "../services/AuthServices";
import { AuthContext } from "../contexts/AuthContext";
import { enqueueSnackbar } from "notistack";
import SelectUserTypeDialog, {
  UserType,
} from "../components/SelectUserTypeDialog";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginContainer() {
  const [loadingSocial, setLoadingSocial] = useState("");
  const { login } = useContext(AuthContext);
  const [socialMediaInfo, setSocialMediaInfo] = useState({
    provider: "",
    accessToken: "",
  });
  const [selectUserTypeDialogOpen, setSelectUserTypeDialogOpen] =
    useState(false);

  const handleSuccessLogin = (response: any) => {
    if (response.isSuccess) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      login && login(response.data.token);
      enqueueSnackbar("Başarıyla giriş yapıldı", { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleSubmitLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().label("E-Posta").email().max(100).required(),
      password: Yup.string()
        .required("Şifre boş bırakılamaz")
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(16, "Şifre en fazla 16 karakter olmalıdır"),
    }),
    onSubmit: async (values: any, helpers) => {
      try {
        const res = await loginUser(
          values.email.trim(),
          values.password.trim()
        );
        handleSuccessLogin(res);
      } catch (err: any) {
        enqueueSnackbar("Bir hata oluştu", { variant: "error" });
        console.error(err);
      }
    },
  });

  const loginWithSocialMedia = async (
    provider: string,
    accessToken: string,
    userTypeId?: UserType
  ) => {
    if (accessToken) {
      setSelectUserTypeDialogOpen(false);
      setSocialMediaInfo({ provider, accessToken });
      if (!accessToken) {
        return;
      }

      setLoadingSocial(provider);

      const response = await authService.loginWithGoogle(
        provider,
        accessToken,
        userTypeId
      );

      if (response.isSuccess) {
        handleSuccessLogin(response);
      } else {
        setSelectUserTypeDialogOpen(true);
      }

      setLoadingSocial("");
    }
  };

  const handleSelectUserType = (userTypeId: UserType) => {
    loginWithSocialMedia(
      socialMediaInfo.provider,
      socialMediaInfo.accessToken,
      userTypeId
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: { xs: "100vw", md: "60vw" },
        }}
      >
        <LoginForm
          handleSubmit={handleSubmitLogin}
          loadingSocial={loadingSocial}
          loginWithSocialMedia={loginWithSocialMedia}
        />
      </Box>
      <Box
        sx={{
          width: "40vw",
          display: { xs: "none", md: "block" },
        }}
      >
        <LoginSlider />

        <SelectUserTypeDialog
          open={selectUserTypeDialogOpen}
          onClose={() => setSelectUserTypeDialogOpen(false)}
          onConfirm={handleSelectUserType}
        />
      </Box>
    </Box>
  );
}
