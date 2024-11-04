import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { ReactComponent as OrganizationIcon } from "../assets/organization.svg";
import { twistLayoutStyle } from "../utils/globalStyles";
import BblTextInput from "./common/BblTextInput";
import BblSelect from "./common/BblSelect";
import BblButton from "./common/BblButton";
import BblIcon from "./common/BblIcon";
import UtiltySelect from "./UtiltySelect";

type EmployerCompanyInfoFormProps = {
  values: any;
  handleChange: (value: any) => void;
  handleNext: () => void;
  handleBack: () => void;
};

export default function EmployerCompanyInfoForm({
  values,
  handleChange,
  handleNext,
  handleBack,
}: EmployerCompanyInfoFormProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [taxNumberError, setTaxNumberError] = useState(false);
  const [mersisNumberError, setMersisNumberError] = useState(false);
  const [recordNumberError, setRecordNumberError] = useState(false);

  const onChange = (value: any) => {
    if (value.taxNumber?.length === 10) setTaxNumberError(false);
    if (value.mersisNumber?.length === 16) setMersisNumberError(false);
    if (value.recordNumber?.length === 16) setRecordNumberError(false);
    handleChange(value);
  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            values.taxNumber.length === 10 &&
            values.mersisNumber.length === 16 &&
            values.recordNumber.length === 16
          ) {
            handleNext();
          } else {
            if (values.taxNumber.length !== 10) {
              setTaxNumberError(true);
            }
            if (values.mersisNumber.length !== 16) {
              setMersisNumberError(true);
            }
            if (values.recordNumber.length !== 16) {
              setRecordNumberError(true);
            }
          }
        }}
      >
        <Paper
          sx={{
            p: matches ? 3 : 1,
            m: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <BblIcon Icon={OrganizationIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: "bold",
                  fontSize: "21px",
                }}
              >
                Firma Bilgileri
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                Firma bilgilerinizi giriniz.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 4,
              gap: 2,
            }}
          >
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                name="foundedDate"
                mask="0000"
                required
                label="Kuruluş Yılı"
                value={values.foundedDate}
                onChange={(e) => {
                  handleChange({ foundedDate: e.target.value });
                }}
              />
              <BblSelect
                required
                label="Çalışan Sayısı"
                value={values.employeesCount}
                // items={[
                //   { name: '1', label: '1-10' },
                //   { name: '2', label: '11-50' },
                //   { name: '3', label: '51-100' },
                //   { name: '4', label: '101-500' },
                //   { name: '5', label: '501-1000' },
                //   { name: '6', label: '1000+' },
                // ]}
                items={[
                  { id: "10", name: "10" },
                  { id: "50", name: "50" },
                  { id: "100", name: "100" },
                  { id: "500", name: "500" },
                  { id: "1000", name: "1000" },
                ]}
                onSelect={(value) => {
                  handleChange({ employeesCount: +value });
                }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                required
                label="Faaliyet Alanı"
                value={values.activityFields}
                onChange={(e) => {
                  handleChange({ activityFields: e.target.value });
                }}
              />
              <BblSelect
                required
                label="Sermaye"
                value={values.capitalPrice}
                // items={[
                //   { name: '1', label: '1-9000' },
                //   { name: '2', label: '10000-50000' },
                //   { name: '3', label: '50000-100000' },
                //   { name: '4', label: '100000-500000' },
                //   { name: '5', label: '500000-1000000' },
                //   { name: '6', label: '1000000+' },
                // ]}
                items={[
                  { id: "10000", name: "10000" },
                  { id: "50000", name: "50000" },
                  { id: "100000", name: "100000" },
                  { id: "500000", name: "500000" },
                  { id: "1000000", name: "1000000" },
                ]}
                onSelect={(value) => {
                  handleChange({ capitalPrice: +value });
                }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <UtiltySelect
                handleChange={(value) => {
                  handleChange({ companyTypeId: value });
                }}
                value={values.companyTypeId || ""}
                meta={{ type: "companyType", label: "Şirket Türü" }}
              />

              <BblTextInput
                required
                label="Ticari Ünvan"
                value={values.commercialTitle}
                onChange={(e) => {
                  onChange({ commercialTitle: e.target.value });
                }}
              />
            </Box>
            {/* <BblSelect
              required
              label="Şirket Türü"
              value={values.companyType}
              items={[
                { name: '1', label: 'Anonim Şirket' },
                { name: '2', label: 'Limited Şirket' },
                { name: '3', label: 'Kolektif Şirket' },
                { name: '4', label: 'Komandit Şirket' },
                { name: '5', label: 'Kooperatif' },
                { name: '6', label: 'Dernek' },
                { name: '7', label: 'Vakıf' },
                { name: '8', label: 'Kamu Kurumu' },
                { name: '9', label: 'Diğer' },
              ]}
              onSelect={(value) => { handleChange({ companyType: +value }) }}
            /> */}

            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                length={10}
                mask="##########"
                name="taxNumber"
                isFalse={taxNumberError}
                required
                label="Vergi No"
                value={values.taxNumber}
                onChange={(e) => {
                  onChange({ taxNumber: e.target.value });
                }}
              />
              <BblTextInput
                required
                label="Vergi Dairesi"
                value={values.taxOffice}
                onChange={(e) => {
                  onChange({ taxOffice: e.target.value });
                }}
              />
            </Box>
            <Box sx={twistLayoutStyle(matches)}>
              <BblTextInput
                mask="####-####-####-####"
                name="recordNumber"
                length={16}
                isFalse={recordNumberError}
                required
                label="Ticaret Sicil No"
                value={values.recordNumber}
                onChange={(e) => {
                  console.log("e.target.value", e.target.value);
                  onChange({ recordNumber: e.target.value });
                }}
              />
              <BblTextInput
                length={16}
                name="mersisNumber"
                mask="####-####-####-####"
                isFalse={mersisNumberError}
                required
                label="Mersis No"
                value={values.mersisNumber}
                onChange={(e) => {
                  onChange({ mersisNumber: e.target.value });
                }}
              />
            </Box>
            <BblTextInput
              required
              label="Özet Bilgi"
              value={values.description}
              multiline
              rows={4}
              onChange={(e) => {
                handleChange({ description: e.target.value });
              }}
            />
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <BblButton
            label="Geri"
            onClick={() => {
              handleBack();
            }}
            variant="outlined"
            sx={{
              mr: 1,
              width: 126,
            }}
          />
          <BblButton
            label="İleri"
            type="submit"
            variant="contained"
            sx={{
              ml: 1,
              width: 126,
            }}
          />
        </Box>
      </form>
    </Box>
  );
}
