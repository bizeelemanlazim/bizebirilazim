import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BblBreadCrumbs from "../components/BblBreadCrumbs";
import AddJobStepper from "../components/AddJobStepper";
import AddJobFormFirstDetails from "../components/AddJobFormFirstDetails";
import AddJobFormQualifications from "../components/AddJobFormQualifications";
import AddJobSummary from "../components/AddJobSummary";
import {
  InsertAddModel,
  InsertOrderSummaryModel,
  PriceRates,
} from "../utils/types";
import { getPriceRates } from "../services/UtilitiesServices";
import { AuthContext } from "../contexts/AuthContext";
import { getAd, insertAds, updateAds } from "../services/AdsServices";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getEmployerProfileSetting } from "../services/ProfileSettingsServices";
type AddEditJobContainerProps = {
  id?: number;
};

export default function AddEditJobContainer({ id }: AddEditJobContainerProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const [employerAddres, setEmployerAddres] = useState("");
  const [insertAdsValues, setInsertAdsValues] = useState<InsertAddModel>();
  const [insertAdsSummary, setInsertAdsSummary] =
    useState<InsertOrderSummaryModel>();
  const [priceRates, setPriceRates] = useState<PriceRates>();
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchGetEmployerProfileSetting = async () => {
    try {
      const res = await getEmployerProfileSetting(token);
      if (res.isSuccess) {
        const { address } = res.data;
        if (address) {
          const newInsertAdsValues = {
            ...insertAdsValues,
            isMyAddress: true,
            address,
          };
          setEmployerAddres(address);

          setInsertAdsValues(newInsertAdsValues as InsertAddModel);
        }
      } else {
        console.log(res.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchJob = async () => {
    try {
      const res = await getAd(token, id!);
      if (res.isSuccess) {
        setInsertAdsValues(res.data.detailAdModel);
      } else {
        enqueueSnackbar("Bir hata oluştu", { variant: "error" });
      }
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar("Bir hata oluştu", { variant: "error" });
    }
  };

  useEffect(() => {
    if (id) {
      fetchJob();
    }

    fetchGetEmployerProfileSetting();
  }, []);

  const handleChanceInsertAdsValues = (values: InsertAddModel) => {
    const keys = Object.keys(values);
    if (keys[0] === "isMyAddress") {
      values.address = values.isMyAddress == true ? employerAddres : "";
    }

    setInsertAdsValues({ ...insertAdsValues, ...values });
  };
  const getPriceRatesInfo = async () => {
    console.log("Test");
    const rates = await getPriceRates(token);
    setPriceRates(rates.data);
  };

  useEffect(() => {
    getPriceRatesInfo();
  }, [token]);

  useEffect(() => {
    const jobName = insertAdsValues ? insertAdsValues.jobName : "";
    const legalDeduction = insertAdsValues
      ? insertAdsValues.price
        ? (insertAdsValues.price * priceRates?.legalDeduction!) / 100 || 0
        : 0
      : 0;
    const commissionFee = insertAdsValues
      ? insertAdsValues.price
        ? (insertAdsValues.price * priceRates?.commissionFee!) / 100 || 0
        : 0
      : 0;
    const total = insertAdsValues
      ? insertAdsValues.price
        ? +insertAdsValues.price + +legalDeduction + +commissionFee
        : 0
      : 0;

    setInsertAdsSummary({
      jobName: jobName!,
      // operationTime: formatDateRange(insertAdsValues?.workStartDate || '', insertAdsValues?.workEndDate || ''),
      operationTime: "3:12:12",
      location:
        (insertAdsValues?.isMyAddress && "Benim Adresim") ||
        insertAdsValues?.address ||
        "",
      progressPayment: insertAdsValues?.price || 0,
      legalDeduction: legalDeduction,
      commissionFee: commissionFee,
      totalFees: total,
    });
  }, [insertAdsValues]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePublish = async () => {
    try {
      if (id) {
        const editAddModel = {
          ...insertAdsValues,
          id: id,
        };

        const editOrderSummaryModel = {
          ...insertAdsSummary,
        };

        const res = await updateAds(token, {
          editAddModel,
          editOrderSummaryModel,
        });
        if (res.isSuccess) {
          enqueueSnackbar("İlanınız başarıyla güncellendi", {
            variant: "success",
          });
          nav("/my-jobs");
        } else {
          enqueueSnackbar("Bir hata oluştu", { variant: "error" });
        }
      } else {
        setLoading(true);
        if (insertAdsValues && insertAdsSummary) {
          const res = await insertAds(token, {
            insertAddModel: insertAdsValues,
            insertOrderSummaryModel: insertAdsSummary,
          });
          if (res.isSuccess) {
            enqueueSnackbar("İlanınız başarıyla yayınlandı", {
              variant: "success",
            });
            nav("/my-jobs");
          } else {
            enqueueSnackbar("Bir hata oluştu", { variant: "error" });
          }
        }
      }
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar("Bir hata oluştu", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: "Ana Sayfa", to: "/" },
          { label: "İlanlarım", to: "/my-jobs" },
          { label: "İlan Ekle" },
        ]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: matches ? "row" : "column",
          gap: 8,
          mt: 4,
        }}
      >
        <AddJobStepper activeStep={activeStep} />
        <Box
          sx={{
            width: "100%",
          }}
        >
          {/* {activeStep === 0 && (
            <PackageSelection
              handleNext={handleNext}
              insertAdsValues={insertAdsValues}
              handleChanceInsertAdsValues={handleChanceInsertAdsValues}
            />
          )} */}
          {activeStep === 0 && (
            <AddJobFormFirstDetails
              handleNext={handleNext}
              handleBack={handleBack}
              insertAdsValues={insertAdsValues}
              handleChanceInsertAdsValues={handleChanceInsertAdsValues}
            />
          )}
          {activeStep === 1 && (
            <AddJobFormQualifications
              handleNext={handleNext}
              handleBack={handleBack}
              insertAdsValues={insertAdsValues}
              handleChanceInsertAdsValues={handleChanceInsertAdsValues}
            />
          )}
          {activeStep === 2 && (
            <AddJobSummary
              handleNext={handlePublish}
              handleBack={handleBack}
              insertAdsSummary={insertAdsSummary}
              loading={loading}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
