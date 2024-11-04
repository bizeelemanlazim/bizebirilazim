import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Logo from "./common/Logo";
import BblTextInput from "./common/BblTextInput";
import BblButton from "./common/BblButton";
import DividerWithLabel from "./common/DividerWithLabel";
import ImgIcon from "./common/ImgIcon";
import amblem from "../assets/amblem.svg";
import googleIcon from "../assets/google-g.svg";
import facebookIcon from "../assets/facebook-f.svg";
import { useNavigate } from "react-router-dom";
import { phoneNumberMask } from "../utils/constants";
import { Formik, Form } from "formik";
import RegisteryAgreements from "./RegisteryAgreements";

type EmployeeRegisterFormProps = {
  handleSubmit: any;
};

export default function EmployeeRegisterForm({
  handleSubmit,
}: EmployeeRegisterFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

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
                mx: { xs: 3, sm: 10, md: 5, lg: 10, xl: 10 },
                mt: { xs: 3, sm: 5, md: 10, lg: 15, xl: 15 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "27px",
                  mb: 2,
                }}
              >
                Kayıt Oluştur
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  mb: 2,
                  fontSize: "17px",
                }}
              >
                Hesabını oluştur ve hemen iş aramaya başla.
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
                  label="Ad"
                  name="firstName"
                  useFormik={handleSubmit}
                />

                <BblTextInput
                  sx={{ width: "100%" }}
                  label="Soyad"
                  name="lastName"
                  useFormik={handleSubmit}
                />
              </Box>
              <BblTextInput
                required
                label="Meslek"
                name="job"
                useFormik={handleSubmit}
              />
              <BblTextInput
                required
                label="E-posta"
                name="email"
                useFormik={handleSubmit}
              />
              <BblTextInput
                required
                label="Telefon Numarası"
                name="phoneNumber"
                useFormik={handleSubmit}
                mask={phoneNumberMask}
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
                  label="Kayıt Ol"
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
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "end",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <BblButton
                      label="Google ile Kayıt Ol"
                      onClick={() => {
                        nav("/");
                      }}
                      variant="contained"
                      preIcon={<ImgIcon src={googleIcon} alt="google" />}
                      textTransform="none"
                      sx={{
                        fontSize: {
                          xs: "10px",
                          sm: "14px",
                          md: "14px",
                          lg: "14px",
                          xl: "14px",
                        },
                      }}
                    />
                    <BblButton
                      label="Giriş"
                      onClick={() => {
                        nav("/login");
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "start",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <BblButton
                      label="Facebook ile Kayıt Ol"
                      onClick={() => {
                        nav("/");
                      }}
                      variant="contained"
                      preIcon={<ImgIcon src={facebookIcon} alt="facebook" />}
                      textTransform="none"
                      sx={{
                        fontSize: {
                          xs: "10px",
                          sm: "14px",
                          md: "14px",
                          lg: "14px",
                          xl: "14px",
                        },
                      }}
                    />
                    <BblButton
                      label="İşveren Kayıt"
                      onClick={() => {
                        nav("/register/employer");
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
    </Box>
  );
}