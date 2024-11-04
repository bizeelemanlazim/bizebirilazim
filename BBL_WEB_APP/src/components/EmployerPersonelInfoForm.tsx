import {
  Badge,
  Box,
  Paper,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import profilePlaceHolder from "../assets/profile-placeholder.png";
import { AuthContext } from "../contexts/AuthContext";
import {
  deletePicture,
  getUserPicture,
  uploadPicture,
} from "../services/ProfileSettingsServices";
import { twistLayoutStyle } from "../utils/globalStyles";
import UtiltySelect from "./UtiltySelect";
import BblButton from "./common/BblButton";
import BblTextInput from "./common/BblTextInput";
import { Delete, Edit } from "@mui/icons-material";
import { useAlert } from "../hooks/useAlert";
import { phoneNumberMask } from "../utils/constants";

type EmployerPersonelInfoFormProps = {
  values: any;
  handleChange: (value: any) => void;
  handleNext: () => void;
};

export default function EmployerPersonelInfoForm({
  values,
  handleChange,
  handleNext,
}: EmployerPersonelInfoFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { employerUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(profilePlaceHolder);
  const [isPictureLoading, setIsPictureLoading] = useState(false);
  const clickRef = useRef<HTMLInputElement>(null);
  const { token, setImage } = useContext(AuthContext);
  const showSnackbar = useAlert();

  const getPicture = async () => {
    try {
      const res = await getUserPicture(token, "employer");
      if (res.isSuccess) {
        setAvatar(res.data);
        setImage && setImage(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPicture();
  }, []);

  function handleClick(type: string) {
    if (type === "edit") {
      clickRef.current!!.click();
    } else {
      deletePic();
    }
  }

  async function handlePic(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0];
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      setIsPictureLoading(true);
      img.onload = async function () {
        try {
          const fd = new FormData();
          fd.append("file", file);
          const response = await uploadPicture(fd, token, "employer");
          getPicture();
        } catch (error) {
          console.error("Resim yükleme hatası:", error);
          // Hata yönetimi için ek işlemler eklenebilir
        } finally {
          setIsPictureLoading(false);
        }
        _URL.revokeObjectURL(objectUrl);
        img.onload = null; // Bellek sızıntısını önlemek için
      };

      img.src = objectUrl;
    }
  }

  const deletePic = async () => {
    try {
      const response = await deletePicture(token, "employer");
      if (response.isSuccess) {
        setAvatar(profilePlaceHolder);
      }
      showSnackbar("Resim Silindi", "success");
    } catch (err: any) {
      showSnackbar("Resim Silinemedi", "error");
    }
  };

  const onChange = (value: any) => {
    handleChange(value);
  };

  const handleNextClick = () => {
        handleNext();

  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNextClick();
        }}
      >
        <Paper
          sx={{
            p: matches ? 3 : 1,
            m: 1,
          }}
        >
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                position: "relative",
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SpeedDial
                    FabProps={{ size: "small" }}
                    ariaLabel="SpeedDial basic example"
                    icon={<SpeedDialIcon />}
                    sx={{
                      mb: 10,
                    }}
                  >
                    <input
                      ref={clickRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handlePic}
                    />

                    <SpeedDialAction
                      key={"1"}
                      icon={<Edit />}
                      tooltipTitle={"Resmi Değiştir"}
                      onClick={() => handleClick("edit")}
                    />
                    {avatar !== profilePlaceHolder && (
                      <SpeedDialAction
                        key={"2"}
                        icon={<Delete />}
                        tooltipTitle={"Resmi Sil"}
                        onClick={() => handleClick("delete")}
                      />
                    )}
                  </SpeedDial>
                }
              >
                <img
                  width={matches ? 120 : 60}
                  height={matches ? 120 : 60}
                  src={avatar}
                  alt="user-pic"
                />
              </Badge>
              <Box>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontSize: matches ? 27 : 16,
                    fontWeight: 700,
                  }}
                >
                  {employerUser?.firstName}{" "}
                  <span style={{ color: theme.palette.primary.main }}>
                    {employerUser?.lastName}
                  </span>
                </Typography>
                <Typography
                  fontWeight={700}
                  fontSize={matches ? 16 : 10}
                  sx={{ color: theme.palette.primary.dark }}
                >
                  {employerUser?.activityFields}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography fontSize={27} fontWeight={700} mt={4}>
              Yetkili Kişi Bilgileri
            </Typography>
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                required
                label="Ad"
                value={values.firstName}
                onChange={(e) => {
                  onChange({ firstName: e.target.value });
                }}
              />
              <BblTextInput
                required
                label="Soyad"
                value={values.lastName}
                onChange={(e) => {
                  onChange({ lastName: e.target.value });
                }}
              />
            </Box>
            <BblTextInput
              required
              label="Eposta"
              value={values.email}
              onChange={(e) => {
                onChange({ email: e.target.value });
              }}
            />
            <Box sx={twistLayoutStyle(matches)}>
             
              <BblTextInput
                required
                label="Telefon Numarası"
                value={values.phoneNumber}
                mask={phoneNumberMask}
                onChange={(e) => {
                  onChange({ phoneNumber: e.target.value });
                }}
              />
            </Box>
        
            <Box sx={twistLayoutStyle(matches)}>
              <UtiltySelect
                handleChange={(value) => {
                  onChange({ cityId: value, districtId: 0 });
                }}
                value={values.cityId || ""}
                meta={{ type: "city", label: "İl" }}
              />
              <UtiltySelect
                handleChange={(value) => {
                  onChange({ districtId: value });
                }}
                value={values.districtId || ""}
                meta={{
                  type: "district",
                  label: "İlçe",
                  cityId: values.cityId,
                }}
              />
            </Box>
            <BblTextInput
              required
              multiline
              rows={4}
              label="Adres"
              value={values.address}
              onChange={(e) => {
                onChange({ address: e.target.value });
              }}
            />
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <BblButton
            type="submit"
            label="İleri"
            variant="contained"
            sx={{
              mt: 2,
              mr: 2,
              width: 130,
            }}
          />
        </Box>
      </form>
    </Box>
  );
}
