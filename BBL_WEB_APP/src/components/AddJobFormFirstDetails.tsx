import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as StartIcon } from "../assets/star.svg";
import BblIcon from "./common/BblIcon";
import { twistLayoutStyle } from "../utils/globalStyles";
import BblDateInput from "./common/BblDateInput";
import BblTextInput from "./common/BblTextInput";
import BblButton from "./common/BblButton";
import UtiltySelect from "./UtiltySelect";
import BblTimeInput from "./common/BblTimeInput";

type AddJobFormFirstDetailsProps = {
  handleNext: () => void;
  handleBack: () => void;
  insertAdsValues: any;
  handleChanceInsertAdsValues: (values: any) => void;
};

export default function AddJobFormFirstDetails({
  handleNext,
  insertAdsValues,
  handleChanceInsertAdsValues,
  handleBack,
}: AddJobFormFirstDetailsProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
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
              İlk Detaylar
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              Yayınlanacak olan ilanın için kullanıcıların görebileceği iş
              detaylarını gir.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={twistLayoutStyle(matches)}>
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ workType: value });
              }}
              value={insertAdsValues?.workType || []}
              meta={{ type: "workingType", label: "Çalışma Şekli Seçiniz" }}
            />
            <UtiltySelect
              required
              searchEnabled
              value={{
                id: insertAdsValues?.jobId || "",
                name: insertAdsValues?.jobName || "",
              }}
              handleChange={(value) => {
                handleChanceInsertAdsValues({
                  jobId: value?.id,
                  jobName: value?.name,
                });
              }}
              meta={{
                label: "Meslek",
                type: "job",
              }}
            />
          </Box>
          <Box sx={twistLayoutStyle(matches)}>
            <UtiltySelect
              required
              value={insertAdsValues?.workingTime}
              handleChange={(value) =>
                handleChanceInsertAdsValues({ workingTime: value })
              }
              meta={{
                label: "Günlük Mesai Süresi / Saat",
                type: "workingTime",
              }}
            />
            <BblTimeInput
              required
              label="Mesai Başlama Saati"
              value={insertAdsValues?.workingStartTime}
              onChange={(value) => {
                handleChanceInsertAdsValues({ workingStartTime: value });
              }}
            />
          </Box>
          <Box sx={twistLayoutStyle(matches)}>
            <BblDateInput
              required
              label="İşe Başlama Tarihi"
              value={insertAdsValues?.workStartDate}
              onChange={(value) => {
                handleChanceInsertAdsValues({ workStartDate: value });
              }}
            />
            <BblDateInput
              required
              label="İşin Bitiş Tarihi"
              value={insertAdsValues?.workEndDate}
              onChange={(value) => {
                handleChanceInsertAdsValues({ workEndDate: value });
              }}
            />
          </Box>
          <Box sx={twistLayoutStyle(matches)}>
            <BblTextInput
              required
              label="Ücret"
              type="number"
              value={insertAdsValues?.price}
              onChange={(e) => {
                handleChanceInsertAdsValues({ price: e.target.value });
              }}
            />
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ experienceId: value });
              }}
              value={insertAdsValues?.experienceId || []}
              meta={{ type: "experience", label: "Deneyim Seçiniz" }}
            />
          </Box>

          <Box sx={twistLayoutStyle(matches)}>
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ educationId: value });
              }}
              value={insertAdsValues?.educationId || []}
              meta={{ type: "education", label: "Eğitim Seçiniz" }}
            />
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ gender: value });
              }}
              value={insertAdsValues?.gender || []}
              meta={{ type: "gender", label: "Cinsiyet Seçiniz" }}
              multiSelect
            />
          </Box>
          <Box sx={twistLayoutStyle(matches)}>
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ cityId: value, districtId: 0 });
              }}
              value={insertAdsValues?.cityId || ""}
              meta={{ type: "city", label: "İl" }}
            />
            <UtiltySelect
              required
              handleChange={(value) => {
                handleChanceInsertAdsValues({ districtId: value });
              }}
              value={insertAdsValues?.districtId || ""}
              meta={{
                type: "district",
                label: "İlçe",
                cityId: insertAdsValues?.cityId,
              }}
            />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={insertAdsValues?.isMyAddress || false}
                  defaultChecked
                  onChange={(e) => {
                    handleChanceInsertAdsValues({
                      isMyAddress: e.target.checked,
                    });
                  }}
                />
              }
              label="Farklı bir adres girmek istiyorum"
            />
          </FormGroup>
          <BblTextInput
            required
            multiline
            rows={4}
            label="Adres"
            value={insertAdsValues?.address}
            onChange={(e) => {
              handleChanceInsertAdsValues({ address: e.target.value });
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
            mt: 1,
          }}
        >
          {/* <BblButton
            label="Geri"
            variant='outlined'
            onClick={handleBack}
          /> */}
          <BblButton type="submit" label="İleri" variant="contained" />
        </Box>
      </form>
    </Box>
  );
}
