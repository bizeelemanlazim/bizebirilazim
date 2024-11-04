import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  useTheme,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GeneralInfoDialog from "./GeneralInfoDialog";

type RegisteryAgreementsProps = {
  useFormik?: any;
};

export default function RegisteryAgreements({
  useFormik,
}: RegisteryAgreementsProps) {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickDocs = (type: string) => {
    if (type === "kvkk") {
      setTitle("KVKK Sözleşmesi");
      setContent("KVKK Sözleşmesi içeriği");
    } else if (type === "gizlilik") {
      setTitle("Gizlilik Sözleşmesi");
      setContent("Gizlilik Sözleşmesi içeriği");
    } else if (type === "uyelik") {
      setTitle("Üyelik Koşulları ve Kullanım Sözleşmesi");
      setContent("Üyelik Koşulları ve Kullanım Sözleşmesi içeriği");
    }
    setOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={useFormik.handleChange}
                name="kvkk"
                checked={useFormik.values.kvkk}
              />
            }
            label={
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: "12px",
                }}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickDocs("kvkk");
                  }}
                  style={{ color: theme.palette.primary.main }}
                >
                  KVKK Sözleşmesi
                </span>
                'ni okudum, onaylıyorum.
              </Typography>
            }
          />
          <FormHelperText style={{ color: "red" }}>
            {useFormik.touched.kvkk && useFormik.errors.kvkk
              ? useFormik.touched.kvkk && useFormik.errors.kvkk
              : " "}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={useFormik.handleChange}
                name="privacyPolicy"
                checked={useFormik.values.privacyPolicy}
              />
            }
            label={
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: "12px",
                }}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickDocs("gizlilik");
                  }}
                  style={{ color: theme.palette.primary.main }}
                >
                  Gizlilik Sözleşmesi
                </span>
                'ni okudum, onaylıyorum.
              </Typography>
            }
          />
          <FormHelperText style={{ color: "red" }}>
            {useFormik.touched.privacyPolicy && useFormik.errors.privacyPolicy
              ? useFormik.touched.privacyPolicy &&
                useFormik.errors.privacyPolicy
              : " "}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={useFormik.handleChange}
                name="membershipAgreement"
                checked={useFormik.values.membershipAgreement}
              />
            }
            label={
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: "12px",
                }}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickDocs("uyelik");
                  }}
                  style={{ color: theme.palette.primary.main }}
                >
                  Üyelik Koşulları
                </span>{" "}
                ve
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickDocs("uyelik");
                  }}
                  style={{ color: theme.palette.primary.main }}
                >
                  {" "}
                  Kullanım Sözleşmesi
                </span>
                'ni okudum, onaylıyorum.
              </Typography>
            }
          />
          <FormHelperText style={{ color: "red" }}>
            {useFormik.touched.membershipAgreement &&
            useFormik.errors.membershipAgreement
              ? useFormik.touched.membershipAgreement &&
                useFormik.errors.membershipAgreement
              : " "}
          </FormHelperText>
        </FormControl>
      </Box>

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
