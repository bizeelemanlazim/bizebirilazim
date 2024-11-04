import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "./common/Logo";
import BblTextInput from "./common/BblTextInput";
import BblButton from "./common/BblButton";
import DividerWithLabel from "./common/DividerWithLabel";
import googleIcon from "../assets/google-g.svg";
import facebookIcon from "../assets/facebook-f.svg";
import ImgIcon from "./common/ImgIcon";
import amblem from "../assets/amblem.svg";
import { useNavigate } from "react-router-dom";
import ForgotPasswordEmailSendDialog from "./ForgotPasswordEmailSendDialog";
import { forgotPasswordEmailSend } from "../services/AuthServices";
import { enqueueSnackbar } from "notistack";
import { useAlert } from "../hooks/useAlert";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import { Formik, Form } from "formik";

type LoginFormProps = {
  handleSubmit: any;
  loginWithSocialMedia: (provider: string, accessToken: string) => void;

  loadingSocial?: string;
};

export default function LoginForm({
  handleSubmit,
  loginWithSocialMedia,
  loadingSocial,
}: LoginFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const nav = useNavigate();
  const showSnackbar = useAlert();
  const [paswordSendLoading, setPaswordSendLoading] = useState(false);

  const [eposta, setEPosta] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmitForgetPassword = async (email: string) => {
    try {
      setPaswordSendLoading(true);
      const res = await forgotPasswordEmailSend(email);
      if (res.isSuccess) {
        showSnackbar("E-posta gönderildi.", "success");
      } else {
        showSnackbar("E-posta gönderilemedi.", "error");
      }
    } catch (err: any) {
      showSnackbar("E-posta gönderilemedi.", "error");
      console.log(err);
    } finally {
      setPaswordSendLoading(false);
      setOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
                Hesabına Giriş Yap
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  mb: 2,
                  fontSize: "17px",
                }}
              >
                Şimdi hesabına giriş yap ve iş ilanlarını incelemeye başla.
              </Typography>
              <BblTextInput
                required
                label="E-posta"
                name="email"
                useFormik={handleSubmit}
              />
              <BblTextInput
                required
                sx={{ mt: 2 }}
                label="Şifre"
                name="password"
                useFormik={handleSubmit}
                type="password"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Beni Hatırla"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BblButton
                  label="Giriş Yap"
                  type="submit"
                  sx={{ mt: 2, width: "100%" }}
                  variant="contained"
                  loading={handleSubmit.isSubmitting}
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
                    <LoginSocialGoogle
                      isOnlyGetToken
                      client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                      onResolve={({ provider, data }: any) => {
                        loginWithSocialMedia(provider, data.access_token);
                      }}
                      onReject={(err: any) => {
                        if (err.status !== "unknown") {
                          enqueueSnackbar(
                            "Google ile giriş yapma sırasında hata oluştu!",
                            { variant: "error" }
                          );
                        }

                        console.error(err);
                      }}
                    >
                      <BblButton
                        label="Google ile Giriş Yap"
                        variant="contained"
                        loading={loadingSocial === "google"}
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
                    </LoginSocialGoogle>
                    <BblButton
                      label="İş Arayan Kayıt"
                      onClick={() => {
                        nav("/register/employee");
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
                    <LoginSocialFacebook
                      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                      fieldsProfile={
                        "id,first_name,last_name,middle_name,name,name_format,short_name,email"
                      }
                      onResolve={({ provider, data }: any) => {
                        loginWithSocialMedia(provider, data.accessToken);
                      }}
                      onReject={(err: any) => {
                        if (err.status !== "unknown") {
                          enqueueSnackbar(
                            "Facebook ile giriş yapma sırasında hata oluştu!",
                            { variant: "error" }
                          );
                        }

                        console.error(err);
                      }}
                    >
                      <BblButton
                        loading={loadingSocial === "facebook"}
                        label="Facebook ile Giriş Yap"
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
                    </LoginSocialFacebook>

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
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant="text"
                  textTransform="none"
                />
              </Box>
            </Box>
          </Box>
        </Form>
      </Formik>
      <ForgotPasswordEmailSendDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={handleSubmitForgetPassword}
        loading={paswordSendLoading}
      />
    </Box>
  );
}
