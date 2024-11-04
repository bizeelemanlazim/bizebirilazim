import { Box, Divider, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BblBreadCrumbs from "../components/BblBreadCrumbs";
import DeleteDialog from "../components/DeleteDialog";
import JobsTable from "../components/JobsTable";
import MyJobsHeader, { JobStatus } from "../components/MyJobsHeader";
import BblButton from "../components/common/BblButton";
import { AuthContext } from "../contexts/AuthContext";
import { useAlert } from "../hooks/useAlert";
import { updateAds } from "../services/AdsServices";
import AdvertisementManagement from "../services/advertisement-management";
import { ApiResult, DetailAds } from "../utils/types";

export default function MyJobsContainer() {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);

  const savedJobStatus = localStorage.getItem("jobStatus");

  const [jobStatus, setJobStatus] = useState<JobStatus>(() => {
    if (
      savedJobStatus &&
      Object.values(JobStatus).includes(savedJobStatus as JobStatus)
    ) {
      return savedJobStatus as JobStatus;
    }

    return JobStatus.ActiveJobs;
  });

  const { token } = useContext(AuthContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<DetailAds | null>(null);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [deleting, setDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myJobs, setMyJobs] = useState<ApiResult<DetailAds>>();
  const showSnackbar = useAlert();
  const [adNameOrder, setAdNameOrder] = useState(
    "detailOrderSummary.jobName:asc"
  );
  const [dateOrder, setDateOrder] = useState(
    "detailAdModel.workStartDate:desc"
  );
  const [order, setOrder] = useState("detailAdModel.id:desc");

  const detailAdAndOrderSummary = async (
    jobStatus: JobStatus,
    page: number,
    order: string
  ) => {
    console.log("advertisement-and-order-summary");
    const result = await AdvertisementManagement.detailAdAndOrderSummary(
      jobStatus,
      page * 10,
      order
    );

    if (result.isSuccess) {
      setMyJobs(result);
    }
  };

  useEffect(() => {
    detailAdAndOrderSummary(jobStatus, page, order);
  }, []);

  useEffect(() => {
    if (myJobs?.totalCount) {
      setTotal(myJobs.totalCount);
    }
  }, [myJobs]);

  useEffect(() => {
    const storedJobStatus = localStorage.getItem("jobStatus");
    if (storedJobStatus) {
      setJobStatus(storedJobStatus as JobStatus);

      detailAdAndOrderSummary(storedJobStatus as JobStatus, page, order);
    }
  }, [searchParams.get("jobStatus")]);

  const handleDeleteClick = async (job: DetailAds) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (job: DetailAds) => {
    try {
      setDeleting(true);
      const newJob = { ...job };
      newJob.detailAdModel.isActive = false;
      const res = await updateAds(token, {
        editAddModel: {
          ...newJob.detailAdModel,
          isActive: false,
        },
        editOrderSummaryModel: {
          ...newJob.detailOrderSummary,
        },
      });
      if (res.isSuccess) {
        await detailAdAndOrderSummary(jobStatus, page, order);
        showSnackbar("İlan başarıyla pasif edildi.", "success");
      } else {
        showSnackbar("Bir hata oluştu.", "error");
        console.log(res.message);
      }
    } catch (err: any) {
      console.log(err);
      showSnackbar("Bir hata oluştu.", "error");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleOrderChangeClick = async (att: string) => {
    if (att === "name") {
      if (adNameOrder === "detailOrderSummary.jobName:asc") {
        setAdNameOrder("detailOrderSummary.jobName:desc");
        setOrder("detailOrderSummary.jobName:desc");
      } else {
        setAdNameOrder("detailOrderSummary.jobName:asc");
        setOrder("detailOrderSummary.jobName:asc");
      }
    } else if (att === "date") {
      if (dateOrder === "detailAdModel.workStartDate:asc") {
        setDateOrder("detailAdModel.workStartDate:desc");
        setOrder("detailAdModel.workStartDate:desc");
      } else {
        setDateOrder("detailAdModel.workStartDate:asc");
        setOrder("detailAdModel.workStartDate:asc");
      }
    }
  };

  return (
    <Box>
      <BblBreadCrumbs
        items={[{ label: "Ana Sayfa", to: "/" }, { label: "İlanlarım" }]}
      />
      <Paper
        sx={{
          pt: 3,
          pb: 1,
          my: 3,
        }}
      >
        <MyJobsHeader jobStatus={jobStatus} count={myJobs?.totalCount || 0} />
        <Divider sx={{ mt: 2 }} />
        <JobsTable
          jobs={(myJobs || {}).data || []}
          isLoading={isLoading}
          handleDeleteClick={handleDeleteClick}
          active={true}
          handleOrderChangeClick={handleOrderChangeClick}
          nameOrder={adNameOrder}
          dateOrder={dateOrder}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
            width: "100%",
          }}
        >
          <Box ml={2}>
            <Typography sx={{ fontSize: 12 }}>
              {`Sayfa ${page + 1}/${Math.ceil(total / 10)}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              mr: 2,
            }}
          >
            <BblButton
              label="Geri"
              variant="contained"
              size="small"
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
              sx={{
                height: 30,
              }}
            />
            <BblButton
              label="İleri"
              variant="contained"
              size="small"
              onClick={() => {
                if (page + 1 < Math.ceil(total / 10)) {
                  setPage(page + 1);
                }
              }}
              sx={{
                height: 30,
              }}
            />
          </Box>
        </Box>
      </Paper>
      <DeleteDialog
        title="İlan Pasife Al"
        description="İlanı pasife almak istediğinize emin misiniz?"
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(selectedJob!)}
        deleting={deleting}
      />
    </Box>
  );
}
