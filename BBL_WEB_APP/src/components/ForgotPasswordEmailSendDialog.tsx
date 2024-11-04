import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import BblButton from "./common/BblButton";
import { Close } from "@mui/icons-material";
import BblTextInput from "./common/BblTextInput";

type ForgotPasswordEmailSendDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  loading?: boolean;
};

export default function ForgotPasswordEmailSendDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: ForgotPasswordEmailSendDialogProps) {
  const [email, setEmail] = React.useState("");

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
          <Typography>Şifremi unuttum</Typography>
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
          onSubmit(email);
        }}
      >
        <DialogContent>
          <BblTextInput
            label="E-posta Adresi"
            placeholder="E-posta Adresi"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <BblButton onClick={onClose} variant="outlined" label="Geri" />
          <BblButton
            loading={loading}
            type="submit"
            variant="contained"
            label="Gönder"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
}
