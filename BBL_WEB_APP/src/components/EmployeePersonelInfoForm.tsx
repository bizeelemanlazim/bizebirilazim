import { Delete, Edit } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import {
  Badge,
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  SpeedDial,
  SpeedDialAction,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import profilePlaceHolder from "../assets/profile-placeholder.png";
import { AuthContext } from "../contexts/AuthContext";
import { useAlert } from "../hooks/useAlert";
import {
  deletePicture,
  getUserPicture,
  sendEmployeePersonelnfo,
  uploadPicture,
} from "../services/ProfileSettingsServices";
import { twistLayoutStyle } from "../utils/globalStyles";
import DisableInfoFormDialog from "./DisableInfoFormDialog";
import UtiltySelect from "./UtiltySelect";
import BblButton from "./common/BblButton";
import BblDateInput from "./common/BblDateInput";
import BblTextInput from "./common/BblTextInput";
import { phoneNumberMask } from "../utils/constants";

type EmployerPersonelInfoFormProps = {
  handleNext: () => void;
};

export default function EmployeePersonelInfoForm({
  handleNext,
}: EmployerPersonelInfoFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const { employeeUser, token, setImage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const clickRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(employeeUser);
  const [isPictureLoading, setIsPictureLoading] = useState(false);
  const [avatar, setAvatar] = useState(profilePlaceHolder);
  const showSnackbar = useAlert();

  const handleChange = (value: any) => {
    setValues({ ...values, ...value });
  };

  useEffect(() => {
    getPicture();
  }, []);

  const getPicture = async () => {
    try {
      const res = await getUserPicture(token, "employee");
      if (res.isSuccess) {
        setAvatar(res.data);
        setImage && setImage(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!values) return;
    try {
      setLoading(true);
      const res = await sendEmployeePersonelnfo(values, token);
      setLoading(false);
      handleNext();
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(type: string) {
    if (type === "edit") {
      clickRef.current!!.click();
    } else {
      deletePic();
    }
  }

  const deletePic = async () => {
    try {
      const response = await deletePicture(token, "employee");
      if (response.isSuccess) {
        setAvatar(profilePlaceHolder);
        setImage && setImage(profilePlaceHolder);
      }
      showSnackbar("Resim Silindi", "success");
    } catch (err: any) {
      showSnackbar("Resim Silinemedi", "error");
    }
  };

  async function handlePic(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0];
      var _URL = window.URL || window.webkitURL;
      var img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      setIsPictureLoading(true);
      img.onload = function () {
        const fd = new FormData();
        fd.append("file", file);
        const res = uploadPicture(fd, token, "employee");
        res.then(async (response) => {
          setIsPictureLoading(false);
          getPicture();
        });
        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    }
  }

  if (!values) return <></>;

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Paper
          sx={{
            p: matches ? 3 : 2,
            m: 1,
          }}
        >
          <Box
            sx={{
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
                  {employeeUser?.firstName || "-"}{" "}
                  <span style={{ color: theme.palette.primary.main }}>
                    {employeeUser?.lastName}
                  </span>
                </Typography>
                <Typography
                  fontWeight={700}
                  fontSize={matches ? 16 : 10}
                  sx={{ color: theme.palette.primary.dark }}
                >
                  Dijital Tasarımcı
                </Typography>
              </Box>
            </Box>
            <Box>
              <FormControlLabel
                sx={{ m: 0 }}
                control={<Switch defaultChecked />}
                label={
                  <Typography fontSize={matches ? 16 : 10} fontWeight={700}>
                    Engelliyim
                  </Typography>
                }
                labelPlacement={matches ? "end" : "bottom"}
              />
              <IconButton
                onClick={() => setOpen(true)}
                size={matches ? "medium" : "small"}
              >
                <SettingsIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Typography fontSize={27} fontWeight={700} mt={4}>
              Kişisel Bilgiler
            </Typography>
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                required
                label="Ad"
                value={values.firstName}
                onChange={(value) => {
                  handleChange({ firstName: value.target.value });
                }}
              />
              <BblTextInput
                required
                label="Soyad"
                value={values.lastName}
                onChange={(value) => {
                  handleChange({ lastName: value.target.value });
                }}
              />
            </Box>
            <BblTextInput
              required
              label="Eposta"
              value={values.email}
              onChange={(value) => {
                handleChange({ email: value.target.value });
              }}
            />
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                required
                label="Telefon Numarası"
                mask={phoneNumberMask}
                value={values.phoneNumber}
                onChange={(value) => {
                  handleChange({ phoneNumber: value.target.value });
                }}
              />
              <BblTextInput
                label="İkinci Telefon Numarası"
                mask={phoneNumberMask}
                value={values.secondPhoneNumber}
                onChange={(value) => {
                  handleChange({ secondPhoneNumber: value.target.value });
                }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ maritalStatusId: value });
                }}
                value={values.maritalStatusId || ""}
                meta={{ type: "marital-status", label: "Medeni Durum" }}
              />
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ genderId: value });
                }}
                value={values.genderId || ""}
                meta={{ type: "gender", label: "Cinsiyet" }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <BblDateInput
                label="Doğum Tarihi"
                value={values.birthDate || ""}
                onChange={(value) => {
                  handleChange({ birthDate: value });
                }}
              />
              <BblTextInput
                required
                label="Doğum Yeri"
                value={values.placeOfBirth}
                onChange={(value) => {
                  handleChange({ placeOfBirth: value.target.value });
                }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ drivingLicenceId: value });
                }}
                value={values.drivingLicenceId || ""}
                meta={{ type: "drivingLicence", label: "Ehliyet" }}
              />
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ nationalityId: value });
                }}
                value={values.nationalityId || ""}
                meta={{ type: "nationality", label: "Uyruk" }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ cityId: value, districtId: 0 });
                }}
                value={values.cityId || ""}
                meta={{ type: "city", label: "İl" }}
              />
              <UtiltySelect
                required
                handleChange={(value) => {
                  handleChange({ districtId: value });
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
              label={"Adres"}
              value={values.address}
              onChange={(value) => {
                handleChange({ address: value.target.value });
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
            label="İleri"
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              mr: 2,
              width: 130,
            }}
          />
        </Box>
      </form>
      <DisableInfoFormDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
}
