import { Box, Typography } from "@mui/material";
import { ReactComponent as StartIcon } from "../assets/star.svg";
import BblButton from "./common/BblButton";
import BblIcon from "./common/BblIcon";
import { InsertOrderSummaryModel } from "../utils/types";

type AddJobSummaryProps = {
  handleNext: () => void;
  handleBack: () => void;
  insertAdsSummary?: InsertOrderSummaryModel;
  loading?: boolean;
};

export default function AddJobSummary({
  handleNext,
  handleBack,
  insertAdsSummary,
  loading,
}: AddJobSummaryProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BblIcon Icon={StartIcon} />
        <Box ml={2}>
          <Typography
            color="primary.dark"
            sx={{
              fontWeight: "bold",
              fontSize: "21px",
            }}
          >
            İlan Özeti
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "14px",
            }}
          >
            Yayın için İlan özetin.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 2,
        }}
      >
        <Typography>
          <span style={{ fontWeight: "bold" }}>Meslek: </span>
          <span>{insertAdsSummary?.jobName || "-"}</span>
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Çalışma Süresi: </span>
          <span>{insertAdsSummary?.operationTime || "-"}</span>
        </Typography>
        <Typography>
          <span style={{ fontWeight: "bold" }}>Lokasyon: </span>
          <span>{insertAdsSummary?.location || "-"}</span>
        </Typography>
        {/* <Typography>
          <span style={{ fontWeight: 'bold' }}>Hakediş: </span>
          <span>
            {insertAdsSummary?.progressPayment || '-'}
          </span>
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Yasal Kesintiler: </span>
          <span>
            {insertAdsSummary?.legalDeduction || '-'}
          </span>
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Komisyon Bedeli: </span>
          <span>
            {insertAdsSummary?.commissionFee || '-'}
          </span>
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Toplam Ücret:  </span>
          <span>
            {insertAdsSummary?.totalFees || '-'}
          </span>
        </Typography> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          mt: 2,
        }}
      >
        <BblButton label="Geri" variant="outlined" onClick={handleBack} />
        <BblButton
          label="Yayınla"
          variant="contained"
          onClick={handleNext}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
