import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import BblButton from "./common/BblButton";
import { Close } from "@mui/icons-material";
import BblTextInput from "./common/BblTextInput";
import BblDateInput from "./common/BblDateInput";
import { CertificateInfoType } from "../utils/types";

type AddQualificationDialogProps = {
  open: boolean;
  onClose: () => void;
  handleAddQualification: (values: CertificateInfoType) => void;
  initialValues?: any;
};

export default function AddQualificationDialog({
  open,
  onClose,
  handleAddQualification,
  initialValues,
}: AddQualificationDialogProps) {

  const [values, setValues] = React.useState(
    initialValues
      ? initialValues
      : {
          certificateName: "",
          certificationInstitution: "",
          startDate: "",
          description: "",
        }
  );

  const handleChange = (value: any) => {
    setValues({ ...values, ...value });
  };

  const habdleSubmit = () => {
    handleAddQualification(values);
  };

  useEffect(() => {
    setValues(
      initialValues
        ? initialValues
        : {
            certificateName: "",
            certificationInstitution: "",
            startDate: "",
            description: "",
          }
    );
  }, [initialValues]);

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
          <Typography>Sertifika Bilgisi Ekle</Typography>
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
            label="Sertifika"
            value={values.certificateName}
            onChange={(e) => handleChange({ certificateName: e.target.value })}
          />
          <BblTextInput
            label="Veren Kurum"
            value={values.certificationInstitution}
            onChange={(e) =>
              handleChange({ certificationInstitution: e.target.value })
            }
          />
          <BblDateInput
            label="Veriliş Tarihi"
            value={values.startDate}
            onChange={(value) => handleChange({ startDate: value })}
            nextDateDisabled={true}
          />
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
          <BblButton type="submit" label="Kaydet" variant="contained" />
        </DialogActions>
      </form>
    </Dialog>
  );
}
