import { Box, Button, Typography, useTheme } from "@mui/material";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();
  const nav = useNavigate();

  return (
    <Box
      sx={{
        left: 0,
        bottom: 0,
        width: "100%",
        minHeight: "250px",
        padding: "40px",
        background: "#f7f8ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "row"],
          alignItems: "center",
          gap: "31px",
          marginBottom: "29px",
        }}
      >
        <Button
          variant="text"
          onClick={() => nav("/")}
          sx={{
            color: "rgba(27, 24, 46, 1)",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "24px",
          }}
        >
          <Typography variant="subtitle1">Anasayfa</Typography>
        </Button>
        <Button
          variant="text"
          onClick={() => nav("/jobs")}
          sx={{
            color: "rgba(27, 24, 46, 1)",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "24px",
          }}
        >
          <Typography variant="subtitle1">İlanlar</Typography>
        </Button>
        <Button
          variant="text"
          onClick={() => nav("/register/employer")}
          sx={{
            color: "rgba(27, 24, 46, 1)",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="subtitle1">İşveren kayıt</Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            color: "rgba(27, 24, 46, 1)",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "24px",
          }}
        >
          <Typography variant="subtitle1">İletişim</Typography>
        </Button>
        <Box
          sx={{
            width: "1px",
            height: "19px",
            flex: "none",
            background: theme.palette.text.primary,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "35px",
          }}
        >
          <Link
            to="https://instagram.com/bizebirilazimcom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="instagram" />
          </Link>

          <Link
            to="https://facebook.com/bizebirilazimcom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="facebook" />
          </Link>

          <Link
            to="https://twitter.com/bizebirilazim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="twitter" />
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          marginBottom: "15px",
        }}
      >
        <img style={{ height: 50 }} src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: ["column", "row"],
          gap: "23px",
        }}
      >
        <Button
          variant="text"
          sx={{
            color: "rgba(27, 24, 46, 1)",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="subtitle2">KVKV Sözleşmesi</Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            color: "rgba(27, 24, 46, 1)",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="subtitle2">Gizlilik Sözleşmesi</Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            color: "rgba(27, 24, 46, 1)",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="subtitle2">Üyelik Koşulları</Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            color: "rgba(27, 24, 46, 1)",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="subtitle2">Kullanım Sözleşmesi</Typography>
        </Button>
      </Box>
    </Box>
  );
}
