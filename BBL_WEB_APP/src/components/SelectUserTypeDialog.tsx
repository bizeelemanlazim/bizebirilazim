import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";

type SelectUserTypeDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (userType: UserType) => void;
};

export enum UserType {
  none = -1,
  employer = 2,
  employee = 3,
}

const userTypeOptions = [
  { value: UserType.none, label: "Seçiniz!" },
  { value: UserType.employer, label: "İşveren" },
  { value: UserType.employee, label: "İş Arayan" },
];

export default function SelectUserTypeDialog({
  open,
  onClose,
  onConfirm,
}: SelectUserTypeDialogProps) {
  const [userType, setUserType] = useState<UserType>(UserType.none);

  const handleChange = (event: any) => {
    setUserType(event.target.value as UserType);
  };

  const handleOnConfirm = () => {
    if (userType > 0) {
      onConfirm(userType);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Üyelik Tipini Seçiniz!</Typography>
      </DialogTitle>
      <DialogContent style={{ width: 300 }}>
        <FormControl fullWidth style={{ marginTop: 16 }}>
          <InputLabel>Üyelik Tipi</InputLabel>
          <Select value={userType} onChange={handleChange} label="User Type">
            {userTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
          }}
        >
          İptal
        </Button>

        <LoadingButton
          variant="contained"
          loading={false}
          onClick={handleOnConfirm}
          sx={{
            textTransform: "none",
          }}
        >
          Seç
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
