import { ArrowUpward } from "@mui/icons-material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import BblBreadCrumbs from "../components/BblBreadCrumbs";
import JobCardItem from "../components/JobCardItem";
import JobsFilterDialog from "../components/JobsFilterDialog";
import JobsFilters from "../components/JobsFilters";
import { AuthContext } from "../contexts/AuthContext";
import { employeeApply } from "../services/AdsServices";
import { PAGE_SIZE } from "../utils/constants";
import { ApiList, DetailAds } from "../utils/types";
import GeneralInfoDialog from "../components/GeneralInfoDialog";
import EmployeeManagementService from "../services/employee-management";

export default function JobsContainer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { token } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = React.useState<DetailAds[]>([]);
  const [applySending, setApplySending] = React.useState(false);
  const [order, setOrder] = React.useState("detailAdModel.id:asc");
  const [jobs, setJobs] = React.useState<DetailAds[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [searchJobOrEmployer, setSearchJobOrEmployer] = useState("");
  const [cityId, setCityId] = useState<number[]>([]);
  const [districtId, setDistrictId] = useState<number[]>([]);
  const [jobId, setJobId] = useState<number[]>([]);
  const [sektorId, setSektorId] = useState<number[]>([]);
  const [workingTypeId, setWorkingTypeId] = useState<number[]>([]);
  const [educationId, setEducationId] = useState<number>();
  const [experienceId, setExperienceId] = useState<number>();
  const [genderId, setGenderId] = useState<number>();
  const [jobContent, setJobContent] = useState("");

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      
      const res =
        await EmployeeManagementService.employeeAdvertisementAndOrderSummary(
          page,
          order,
          {
            searchJobOrEmployer,
            cityId: cityId.map((x: any) => x.id),
            districtId: districtId.map((x: any) => x.id),
            jobId,
            sektorId,
            workingTypeId,
            educationId,
            experienceId,
            genderId,
          }
        );

      if (res.isSuccess) {
        if (page === 1) {
          setJobs(res.data.data);
          setLastPage(res.data.totalCount! / PAGE_SIZE);
        } else {
          setJobs(jobs.concat(res.data.data));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page === 0) {
      setPage(1);
      return;
    }
    fetchJobs();
  }, [order, page]);

  useEffect(() => {
    setPage(0);
    setJobs([]);
  }, [
    searchJobOrEmployer,
    cityId,
    districtId,
    jobId,
    sektorId,
    workingTypeId,
    educationId,
    experienceId,
    genderId,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      if (page < lastPage && !isLoading) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, lastPage, isLoading]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = async (job: DetailAds) => {
    try {
      setApplySending(true);
      const res = await employeeApply(token, job.detailAdModel.id);
      if (res.isSuccess) {
        enqueueSnackbar("Başvurunuz başarıyla alındı.", { variant: "success" });
        setAppliedJobs([...appliedJobs, job]);
      } else {
        enqueueSnackbar("Bir hata oluştu.", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Bir hata oluştu.", { variant: "error" });
    } finally {
      setApplySending(false);
    }
  };

  const handleOrderChange = () => {
    if (order === "detailAdModel.id:desc") {
      setOrder("detailAdModel.id:asc");
    } else {
      setOrder("detailAdModel.id:desc");
    }
    setPage(1);
    setJobs([]);
  };

  return (
    <Box>
      <BblBreadCrumbs
        items={[{ label: "Ana Sayfa", to: "/" }, { label: "İlanlar" }]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 2,
        }}
      >
        {matches && (
          <Box
            sx={{
              width: 280,
            }}
          >
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
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            flexFlow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: matches ? "flex-end" : "center",
              justifyContent: "space-between",
            }}
          >
            {matches && (
              <Box>
                <Typography fontWeight={700}>İş İlanları</Typography>
                <Typography fontSize={14}>
                  İş İlanları arasından kariyer hedefinize uygun firmalara
                  özgeçmişinizi gönderebilirsiniz.
                </Typography>
              </Box>
            )}
            <Box
              onClick={handleOrderChange}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography color="primary">
                <span>Sırala: </span>
                <span style={{ fontWeight: 700 }}>En Son Yayınlanan</span>
              </Typography>
              <ArrowUpward
                sx={{
                  rotate: order === "detailAdModel.id:asc" ? "0deg" : "180deg",
                }}
              />
            </Box>
            {!matches && (
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <FilterListOutlinedIcon />
              </IconButton>
            )}
          </Box>
          <Grid my={2} container spacing={2}>
            {jobs.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                <JobCardItem
                  key={index}
                  job={item}
                  onClick={() => {
                    setJobContent(item.detailAdModel.attribute);
                    setDetailDialogOpen(true);
                  }}
                  handleApply={handleApply}
                  applySending={applySending}
                  isApplied={appliedJobs.some(
                    (appliedJob) =>
                      appliedJob.detailAdModel.id === item.detailAdModel.id
                  )}
                />
              </Grid>
            ))}
          </Grid>
          {isLoading && (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          )}
          {!isLoading && jobs.length === 0 && (
            <Box display="flex" justifyContent="center" my={6}>
              <Typography>İlan bulunamadı.</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <GeneralInfoDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        title="İş Detayları"
        content={jobContent}
      />
      <JobsFilterDialog
        open={open}
        onClose={handleClose}
        searchJobOrEmployer={searchJobOrEmployer}
        setSearchJobOrEmployer={setSearchJobOrEmployer}
        // location={location}
        // setLocation={setLocation}
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
    </Box>
  );
}
