import { Box } from "@mui/material";
import BblFilterSearchField from "./common/BblFilterSearchField";
import BblMultiChoiceFilterItem from "./common/BblMultiChoiceFilterItem";
import UtiltySelect from "./UtiltySelect";

type JobsFiltersProps = {
  searchJobOrEmployer: string;
  setSearchJobOrEmployer: (value: string) => void;
  cityId: Array<any>;
  setCityId: (value: Array<any>) => void;
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

export default function JobsFilters({
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
}: JobsFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 180px)",
        overflow: "auto",
        gap: 2,
        my: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblFilterSearchField
          label="Anahtar kelime"
          value={searchJobOrEmployer}
          onChange={(value) => setSearchJobOrEmployer(value)}
        />
        {/* <BblFilterSearchField
          label="İlçe, İl"
          value={location}
          onChange={(value) => setLocation(value)}
        /> */}
      </Box>

      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        {" "}
        <UtiltySelect
          handleChange={setCityId}
          value={cityId || ""}
          multiSelect
          meta={{ type: "city", label: "İl" }}
        />
        <UtiltySelect
          handleChange={setDistrictId}
          value={districtId || ""}
          multiSelect
          meta={{
            type: "district",
            label: "İlçe",
            cityId: ((cityId || [])[0] || {}).id,
          }}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Pozisyon"
          textFieldLabel="Meslek Ara"
          multiSelect
          url="jobs"
          searchEnabled
          value={jobId}
          onChange={setJobId}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Sektör"
          textFieldLabel="Sektör Ara"
          multiSelect
          url="sector-types"
          value={sektorId}
          onChange={setSektorId}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Çalışma Şekli"
          textFieldLabel=" Ara"
          multiSelect
          url="working-types"
          value={workingTypeId}
          onChange={setWorkingTypeId}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Eğitim Seviyesi"
          textFieldLabel=" Eğitim"
          url="education-types"
          value={educationId}
          onChange={setEducationId}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Deneyim"
          textFieldLabel=" Deneyim"
          url="experience-types"
          value={experienceId}
          onChange={setExperienceId}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "14px",
          background: "#F6F8FF",
          p: 1,
        }}
      >
        <BblMultiChoiceFilterItem
          defaultExpanded
          label="Cinsiyet"
          textFieldLabel="Cinsiyet"
          url="gender-types"
          value={genderId}
          onChange={setGenderId}
        />
      </Box>
    </Box>
  );
}
