import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BblButton from "./common/BblButton";
import { Close } from "@mui/icons-material";
import BblTextInput from "./common/BblTextInput";
import BblDateInput from "./common/BblDateInput";
import { EducationInfoType } from "../utils/types";

type AddEducationInfoDialogProps = {
  open: boolean;
  onClose: () => void;
  handleAddEducationInfo: (values: any) => void;
  initialValues?: EducationInfoType;
};

export default function AddEducationInfoDialog({
  open,
  onClose,
  handleAddEducationInfo,
  initialValues,
}: AddEducationInfoDialogProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [values, setValues] = useState(
    initialValues
      ? initialValues
      : {
          school: "",
          section: "",
          startDate: "",
          endDate: "",
          description: "",
          isContinue: false,
          isBreak: false,
        }
  );

  useEffect(() => {
    setValues(
      initialValues
        ? initialValues
        : {
            school: "",
            section: "",
            startDate: "",
            endDate: "",
            description: "",
            isContinue: false,
            isBreak: false,
          }
    );
  }, [initialValues]);

  const handleChange = (value: any) => {
    setValues({ ...values, ...value });
  };

  const habdleSubmit = () => {
    handleAddEducationInfo(values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography>Eğitim Bilgisi Ekle</Typography>
          <BblButton
            sx={{
              position: "absolute",
              right: 0,
            }}
            onClick={onClose}
            iconButton
            icon={<Close />}
          />
        </Box>
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          habdleSubmit();
        }}
      >
        <DialogContent>
          <BblTextInput
            required
            label="Okul İsmi"
            value={values.school}
            onChange={(e) => handleChange({ school: e.target.value })}
          />
          <BblTextInput
            required
            label="Bölüm İsmi"
            value={values.section}
            onChange={(e) => handleChange({ section: e.target.value })}
          />
          <BblDateInput
            required
            label="Başlangıç Tarihi"
            value={values.startDate}
            onChange={(value) => {
              handleChange({ startDate: value });
            }}
            nextDateDisabled={true}
          />
          <BblDateInput
            required
            label="Mezuniyet Tarihi"
            value={values.endDate}
            onChange={(value) => {
              handleChange({ endDate: value });
            }}
            nextDateDisabled={true}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControlLabel
              sx={{ m: 0, ml: -1 }}
              control={
                <Switch
                  defaultChecked
                  onChange={(e) =>
                    handleChange({ isContinue: e.target.checked })
                  }
                  checked={values.isContinue}
                />
              }
              label={
                <Typography fontSize={matches ? 16 : 10} fontWeight={700}>
                  Devam Ediyor
                </Typography>
              }
            />
            <FormControlLabel
              sx={{ m: 0, ml: -1 }}
              control={
                <Switch
                  defaultChecked
                  onChange={(e) => handleChange({ isBreak: e.target.checked })}
                  checked={values.isBreak}
                />
              }
              label={
                <Typography fontSize={matches ? 16 : 10} fontWeight={700}>
                  Terk
                </Typography>
              }
            />
          </Box>
          <BblTextInput
            label="Açıklama"
            value={values.description}
            onChange={(e) => handleChange({ description: e.target.value })}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <BblButton label="İptal" variant="outlined" onClick={onClose} />
          <BblButton label="Kaydet" variant="contained" type="submit" />
        </DialogActions>
      </form>
    </Dialog>
  );
}
