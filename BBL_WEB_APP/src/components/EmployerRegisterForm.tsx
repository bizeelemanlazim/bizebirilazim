import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Logo from "./common/Logo";
import BblTextInput from "./common/BblTextInput";
import BblButton from "./common/BblButton";
import DividerWithLabel from "./common/DividerWithLabel";
import ImgIcon from "./common/ImgIcon";
import amblem from "../assets/amblem.svg";
import { useNavigate } from "react-router-dom";
import GeneralInfoDialog from "./GeneralInfoDialog";
import { phoneNumberMask } from "../utils/constants";
import RegisteryAgreements from "./RegisteryAgreements";
import { Formik, Form } from "formik";

type EmployerRegisterFormProps = {
  handleSubmit: any;
};

export default function EmployerRegisterForm({
  handleSubmit,
}: EmployerRegisterFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        my: 5,
      }}
    >
      <Formik
        initialValues={handleSubmit.initialValues}
        onSubmit={handleSubmit.handleSubmit}
      >
        <Form noValidate onSubmit={handleSubmit.handleSubmit}>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: matches ? "64px" : "52px",
              left: "0px",
              top: "0px",
              background: theme.palette.primary.main,
              boxShadow: "-15px 4px 71px rgba(0, 178, 255, 0.2)",
              borderRadius: "0px 0px 70px 0px",
              display: { xs: "flex", md: "none" },
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <ImgIcon
              src={amblem}
              alt="amblem"
              style={{
                marginLeft: matches ? "20px" : "10px",
                width: matches ? "52px" : "32px",
                height: matches ? "52px" : "32px",
              }}
            />
          </Box>
          <Logo
            style={{
              width: matches ? 400 : 300,
              marginTop: matchesMd ? 0 : matches ? 90 : 70,
            }}
          />
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                mx: { xs: 3, sm: 10, md: 5, lg: 10, xl: 20 },
                mt: { xs: 3, sm: 5, md: 10, lg: 15, xl: 20 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "27px",
                  mb: 2,
                }}
              >
                İşveren Hesabı Oluştur
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  mb: 2,
                  fontSize: "17px",
                }}
              >
                İşveren hesabı oluştur ve hemen ilanlarını yayınlamaya başla.
                Sana özel isteklere ulaş.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: matches ? "row" : "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: matches ? 2 : 0,
                  width: "100%",
                }}
              >
                <BblTextInput
                  label="Yetkili Ad"
                  name="firstName"
                  useFormik={handleSubmit}
                />

                <BblTextInput
                  label="Yetkili Soyad"
                  name="lastName"
                  useFormik={handleSubmit}
                />
              </Box>

              <BblTextInput
                label="Ticari Ünvan"
                name="commercialTitle"
                useFormik={handleSubmit}
              />

              <BblTextInput
                label="E-posta"
                name="email"
                useFormik={handleSubmit}
              />

              <BblTextInput
                label="Telefon Numarası"
                name="phoneNumber"
                useFormik={handleSubmit}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: matches ? "row" : "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: matches ? 2 : 0,
                  width: "100%",
                }}
              >
                <BblTextInput
                  required
                  label="Şifre"
                  name="password"
                  useFormik={handleSubmit}
                  type="password"
                />
                <BblTextInput
                  required
                  label="Tekrar Şifre"
                  name="confirmPassword"
                  useFormik={handleSubmit}
                  type="password"
                />
              </Box>

              <RegisteryAgreements useFormik={handleSubmit} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BblButton
                  loading={handleSubmit.isSubmitting}
                  label="İşveren Olarak Kayıt Ol"
                  type="submit"
                  sx={{ mt: 2, width: "100%" }}
                  variant="contained"
                />
                <DividerWithLabel label="ya da" width="50%" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "start",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <BblButton
                      label="Giriş"
                      onClick={() => {
                        nav("/login");
                      }}
                    />
                    <BblButton
                      label="İş Arayan Kayıt"
                      onClick={() => {
                        nav("/register/employee");
                      }}
                    />
                  </Box>
                </Box>
                <BblButton
                  label="Şifremi Unuttum"
                  onClick={() => {}}
                  variant="text"
                  textTransform="none"
                />
              </Box>
            </Box>
          </Box>
        </Form>
      </Formik>
      <GeneralInfoDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        content={content}
      />
    </Box>
  );
}
