import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import BblButton from "./common/BblButton";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BblSelect from "./common/BblSelect";

export enum JobStatus {
  ActiveJobs = "1",
  OngoingJobs = "2",
  CompletedJobs = "3",
}

type MyJobsHeaderProps = {
  jobStatus: JobStatus;
  count: number;
};

export default function MyJobsHeader({
  jobStatus = JobStatus.ActiveJobs,
  count,
}: MyJobsHeaderProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const nav = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: matches ? "row" : "column",
        justifyContent: matches ? "space-between" : "center",
        alignItems: matches ? "center" : "flex-start",
        gap: 2,
        px: 3,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            maxWidth: 350,
          }}
        >
          <BblSelect
            label=""
            items={[
              { id: "1", name: "Aktif İlanlarım" },
              { id: "2", name: "Devam Eden İşler" },
              { id: "3", name: "Tamamlanan İşler" },
            ]}
            onSelect={(e) => {
              localStorage.setItem("jobStatus", e);
              nav(`/my-jobs?jobStatus=${e}`);
            }}
            value={jobStatus}
          />
          <Box
            sx={{
              backgroundColor: "#CBEFFF",
              borderRadius: "16px",
              px: 1,
              py: 0.25,
              width: 300,
            }}
          >
            <Typography fontSize={14} fontWeight={500} color="primary">
              {count} Adet İlan Bulundu
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography fontSize={14} fontWeight={500}>
            İlanlarını düzenleyebilir ya da pasif duruma getirebilirsin.
          </Typography>
        </Box>
      </Box>
      <Box>
        <BblButton
          label="İlan Oluştur"
          variant="contained"
          onClick={() => {
            nav("/my-jobs/new");
          }}
          preIcon={<Add />}
        />
      </Box>
    </Box>
  );
}
