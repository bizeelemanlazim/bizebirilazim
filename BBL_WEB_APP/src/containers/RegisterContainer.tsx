import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import LoginSlider from "../components/LoginSlider";
import EmployerRegisterForm from "../components/EmployerRegisterForm";
import EmployeeRegisterForm from "../components/EmployeeRegisterForm";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import authService from "../services/auth";
import { useLocation } from "react-router-dom";

type RegisterContainerProps = {
  mode: string;
};

export default function RegisterContainer({ mode }: RegisterContainerProps) {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();
  const isEmployee = location.pathname.endsWith("employee");

  const handleSubmit = useFormik({
    initialValues: {
      userTypeId: 2,
      firstName: "",
      lastName: "",
      commercialTitle: "",
      job: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      kvkk: false,
      privacyPolicy: false,
      membershipAgreement: false,
      submit: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().label("Ad").max(100).required(),
      lastName: Yup.string().label("Yetkili soyad").max(100).required(),
      commercialTitle: isEmployee
        ? Yup.string().max(100)
        : Yup.string().max(100).required("Ticari Ünvan boş bırakılamaz"),
      job: Yup.string().label("Meslek").max(100).required(),
      email: Yup.string().label("E-Posta").email().max(100).required(),
      phoneNumber: Yup.string().required("Telefon numarası boş bırakılamaz"),
      password: Yup.string()
        .required("Şifre boş bırakılamaz")
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(16, "Şifre en fazla 16 karakter olmalıdır"),

      confirmPassword: Yup.string()
        .required("Şifre boş bırakılamaz")
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(16, "Şifre en fazla 16 karakter olmalıdır"),
      kvkk: Yup.boolean()
        .oneOf(
          [true],
          "Üyelik Koşulları ve Kullanım Sözleşmesi'ni işaretlemelisiniz"
        )
        .required(
          "Üyelik Koşulları ve Kullanım Sözleşmesi'ni işaretlemelisiniz"
        ),
      privacyPolicy: Yup.boolean()
        .oneOf([true], "Gizlilik Sözleşmesi'ni işaretlemelisiniz")
        .required("Gizlilik Sözleşmesi'ni işaretlemelisiniz"),
      membershipAgreement: Yup.boolean()
        .oneOf(
          [true],
          "Üyelik Koşulları ve Kullanım Sözleşmesi'ni işaretlemelisiniz"
        )
        .required(
          "Üyelik Koşulları ve Kullanım Sözleşmesi'ni işaretlemelisiniz"
        ),
    }),
    onSubmit: async (values: any, helpers) => {
      values["UserType"] = isEmployee ? 3 : 2;
      values.phoneNumber = values.phoneNumber.match(/\d+/g).join("");

      const response = await authService.registerUser(values);
      if (response.isSuccess) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        login && login(response.data.token);
        nav("/settings", { replace: true });
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: { xs: "100vw", md: "60vw" },
        }}
      >
        {mode === "employer" ? (
          <EmployerRegisterForm handleSubmit={handleSubmit} />
        ) : (
          <EmployeeRegisterForm handleSubmit={handleSubmit} />
        )}
      </Box>
      <Box
        sx={{
          width: "40vw",
          display: { xs: "none", md: "block" },
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
        }}
      >
        <LoginSlider />
      </Box>
    </Box>
  );
}
