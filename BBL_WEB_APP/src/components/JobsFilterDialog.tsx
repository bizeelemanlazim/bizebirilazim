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
import JobsFilters from "./JobsFilters";

type JobsFilterDialogProps = {
  open: boolean;
  onClose: () => void;
  searchJobOrEmployer: string;
  setSearchJobOrEmployer: (value: string) => void;
  cityId: Array<number>;
  setCityId: (value: Array<number>) => void;
  districtId: Array<number>;
  setDistrictId: (value: Array<number>) => void;
  jobId: number[];
  setJobId: (values: number[]) => void;
  sektorId: number[];
  setSektorId: (values: number[]) => void;
  workingTypeId: number[];
  setWorkingTypeId: (values: number[]) => void;
  educationId?: number;
  setEducationId: (value: number) => void;
  experienceId?: number;
  setExperienceId: (value: number) => void;
  genderId?: number;
  setGenderId: (value: number) => void;
};

export default function JobsFilterDialog({
  open,
  onClose,
  searchJobOrEmployer,
  setSearchJobOrEmployer,
  cityId,
  setCityId,
  districtId,
  setDistrictId,
  jobId,
  setJobId,
  sektorId,
  setSektorId,
  workingTypeId,
  setWorkingTypeId,
  educationId,
  setEducationId,
  experienceId,
  setExperienceId,
  genderId,
  setGenderId,
}: JobsFilterDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
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
          <Typography>Filtreler</Typography>
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
      <DialogContent>
        <JobsFilters
          searchJobOrEmployer={searchJobOrEmployer}
          setSearchJobOrEmployer={setSearchJobOrEmployer}
          cityId={cityId}
          setCityId={setCityId}
          districtId={districtId}
          setDistrictId={setDistrictId}
          jobId={jobId}
          setJobId={setJobId}
          sektorId={sektorId}
          setSektorId={setSektorId}
          workingTypeId={workingTypeId}
          setWorkingTypeId={setWorkingTypeId}
          educationId={educationId}
          setEducationId={setEducationId}
          experienceId={experienceId}
          setExperienceId={setExperienceId}
          genderId={genderId}
          setGenderId={setGenderId}
        />
      </DialogContent>
      <DialogActions>
        <BblButton
          label="Uygula"
          onClick={() => {
            onClose();
          }}
          variant="contained"
        />
      </DialogActions>
    </Dialog>
  );
}
