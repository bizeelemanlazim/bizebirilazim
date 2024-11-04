import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BblIcon from "./common/BblIcon";
import { ReactComponent as CreditCardIcon } from "../assets/credit-card.svg";
import { ReactComponent as KimlikIcon } from "../assets/kimlik.svg";
import { twistLayoutStyle } from "../utils/globalStyles";
import BblTextInput from "./common/BblTextInput";
import BblButton from "./common/BblButton";
import { BankAndIdentityType } from "../utils/types";
import { ca } from "date-fns/locale";
import {
  editBankAndIdentity,
  getBankAndIdentity,
  sendBankAndIdentity,
} from "../services/ProfileSettingsServices";
import { AuthContext } from "../contexts/AuthContext";
import BblDateInput from "./common/BblDateInput";

export default function EmployeeBankInfoForm() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { token } = useContext(AuthContext);

  const [bankAndIdentityInfo, setBankAndIdentityInfo] =
    useState<BankAndIdentityType>({
      bankName: "",
      branchName: "",
      branchCode: "",
      accountName: "",
      iban: "",
      tcIdentityNumber: "",
      tcSerialNumber: "",
      expiryDate: "",
      fatherName: "",
      motherName: "",
      issuingAuthority: "",
      settlementBarcodeNumber: "",
      criminalRecordBarcodeNumber: "",
    });

  const handleChange = (value: any) => {
    setBankAndIdentityInfo({ ...bankAndIdentityInfo, ...value });
  };

  const handleSubmit = async () => {
    try {
      if (bankAndIdentityInfo.id) {
        const res = await editBankAndIdentity(bankAndIdentityInfo, token);
      } else {
        const res = await sendBankAndIdentity(bankAndIdentityInfo, token);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const fetchBankAndIdentityInfo = async () => {
    try {
      const res = await getBankAndIdentity(token);
      if (res.isSuccess && res.data) setBankAndIdentityInfo(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBankAndIdentityInfo();
  }, []);

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box>
          {/* <Paper
          sx={{
            p: matches ? 3 : 2,
            m: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <BblIcon Icon={CreditCardIcon} />
            <Box ml={2}>
              <Typography
                color="primary.dark"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '21px',
                }}
              >
                Banka Bilgileri
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: '14px',
                }}
              >
                Banka bilgilerini girebilirsin.
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
            </Typography>
            <Box
              sx={twistLayoutStyle(matches)}
            >
              <BblTextInput
                required
                label="Banka Adı"
                onChange={(e) => { handleChange({ bankName: e.target.value }) }}
                value={bankAndIdentityInfo.bankName}
              />
              <BblTextInput
                required
                label="Şube Adı"
                onChange={(e) => handleChange({ branchName: e.target.value })}
                value={bankAndIdentityInfo.branchName}
              />
            </Box>
            <Box
              sx={twistLayoutStyle(matches)}
            >
              <BblTextInput
                required
                label="Şube Kodu"
                onChange={(e) => { handleChange({ branchCode: e.target.value }) }}
                value={bankAndIdentityInfo.branchCode}
              />
              <BblTextInput
                required
                label="Hesap Numarası"
                onChange={(e) => { handleChange({ accountName: e.target.value }) }}
                value={bankAndIdentityInfo.accountName}
              />
            </Box>
            <BblTextInput
              required
              label="IBAN"
              onChange={(e) => { handleChange({ iban: e.target.value }) }}
              value={bankAndIdentityInfo.iban}
            />
          </Box>
        </Paper> */}
        </Box>
        <Box>
          <Paper
            sx={{
              p: matches ? 3 : 2,
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
              <BblIcon Icon={KimlikIcon} />
              <Box ml={2}>
                <Typography
                  color="primary.dark"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "21px",
                  }}
                >
                  Kimlik Bilgileri
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Kimlik bilgilerini girebilirsin.
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box sx={twistLayoutStyle(matches)}>
                <BblTextInput
                  required
                  mask="00000000000"
                  label="TC Kimlik Numarası"
                  onChange={(e) => {
                    handleChange({ tcIdentityNumber: e.target.value });
                  }}
                  value={bankAndIdentityInfo.tcIdentityNumber}
                />
                <BblTextInput
                  required
                  label="TC Kimlik Seri No"
                  onChange={(e) => {
                    handleChange({ tcSerialNumber: e.target.value });
                  }}
                  value={bankAndIdentityInfo.tcSerialNumber}
                />
              </Box>
              <Box sx={twistLayoutStyle(matches)}>
                <BblDateInput
                  required
                  label="Son Geçerlilik Tarihi"
                  onChange={(value) => {
                    handleChange({ expiryDate: value });
                  }}
                  value={bankAndIdentityInfo.expiryDate}
                />
                <BblTextInput
                  required
                  label="Veren Makam"
                  onChange={(e) => {
                    handleChange({ issuingAuthority: e.target.value });
                  }}
                  value={bankAndIdentityInfo.issuingAuthority}
                />
              </Box>
              <Box sx={twistLayoutStyle(matches)}>
                <BblTextInput
                  required
                  label="Anne Adı"
                  onChange={(e) => {
                    handleChange({ motherName: e.target.value });
                  }}
                  value={bankAndIdentityInfo.motherName}
                />
                <BblTextInput
                  required
                  label="Baba Adı"
                  onChange={(e) => {
                    handleChange({ fatherName: e.target.value });
                  }}
                  value={bankAndIdentityInfo.fatherName}
                />
              </Box>
              <Box sx={twistLayoutStyle(matches)}>
                <BblTextInput
                  required
                  mask="0000-0000-0000-0000"
                  label="Yerleşim Yeri Barkod Kodu"
                  onChange={(e) => {
                    handleChange({ settlementBarcodeNumber: e.target.value });
                  }}
                  value={bankAndIdentityInfo.settlementBarcodeNumber}
                />
                <BblTextInput
                  required
                  label="Sabıka Kaydı Barkod No"
                  mask="0000-0000-0000-0000"
                  onChange={(e) => {
                    handleChange({
                      criminalRecordBarcodeNumber: e.target.value,
                    });
                  }}
                  value={bankAndIdentityInfo.criminalRecordBarcodeNumber}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {matches && (
            <Typography fontWeight={500}>
              Değişiklikleri kaydetmek için sms doğrulaması gerekmektedir!
            </Typography>
          )}
          <BblButton
            variant="outlined"
            onClick={() => {}}
            label="Geri"
            sx={{
              width: 126,
            }}
          />
          <BblButton
            variant="contained"
            type="submit"
            label="Kaydet"
            sx={{
              width: 126,
            }}
          />
        </Box>
      </form>
    </Box>
  );
}
