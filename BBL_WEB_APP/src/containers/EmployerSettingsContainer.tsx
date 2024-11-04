import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import BblTabs from '../components/common/BblTabs'
import { EmployerProfileSettingsType, TabItemType } from '../utils/types';
import EmployerPersonelInfoForm from '../components/EmployerPersonelInfoForm';
import EmployerCompanyInfoForm from '../components/EmployerCompanyInfoForm';
import EmployerSecurityInfoForm from '../components/EmployerSecurityInfoForm';
import { defaultEmployerProfile } from '../utils/defaults';
import { getEmployerProfileSetting, sendEmployerProfileSetting } from '../services/ProfileSettingsServices';
import { AuthContext } from '../contexts/AuthContext';
import { useAlert } from '../hooks/useAlert';

export default function EmployerSettingsContainer() {

  const [activeTab, setActiveTab] = useState('personelInfo');
  const { token } = useContext(AuthContext);
  const showSnackbar = useAlert();
  const handleTabChange = (e: any, item: string) => {
    setActiveTab(item);
  }

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<EmployerProfileSettingsType>(defaultEmployerProfile);

  const handleChange = (value: EmployerProfileSettingsType) => {
    setValues({ ...values, ...value, })
  }

  const fetchValues = async () => {
    try {
      const res = await getEmployerProfileSetting(token);
      if (res.isSuccess) {
        setValues(res.data);
      } else {
        console.log(res.message)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchValues()
  }, [])

  const handleNext = () => {
    if (activeTab === 'personelInfo') {
      setActiveTab('companyInfo');
    } else if (activeTab === 'companyInfo') {
      setActiveTab('securityInfo');
    }
  }

  const handleBack = () => {
    if (activeTab === 'companyInfo') {
      setActiveTab('personelInfo');
    } else if (activeTab === 'securityInfo') {
      setActiveTab('companyInfo');
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await sendEmployerProfileSetting(values, token);
      if (res.isSuccess) {
        showSnackbar("Profil bilgileriniz başarıyla güncellendi", 'success');
        setActiveTab('personelInfo');
      } else {
        showSnackbar("Bir hata oluştu", 'error');
      }
    } catch (err: any) {
      setLoading(false);
      showSnackbar("Bir hata oluştu", 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: "Ana Sayfa", to: "/" },
          { label: "İşveren Profili", to: "/profile" },
          { label: "Ayarlar" },
        ]}
      />
      <BblTabs
        sx={{ mt: 2 }}
        value={activeTab}
        onChange={handleTabChange}
        items={[
          { label: "Yetkili Kişi Bilgileri", slug: "personelInfo" },
          { label: "Firma Bilgileri", slug: "companyInfo" },
          { label: "Güvenlik Bilgileri", slug: "securityInfo" },
        ]}
      />
      <Box sx={{ mt: 3 }}>
        {activeTab === "personelInfo" && (
          <EmployerPersonelInfoForm
            values={values}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        )}
        {activeTab === "companyInfo" && (
          <EmployerCompanyInfoForm
            values={values}
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {activeTab === "securityInfo" && (
          <EmployerSecurityInfoForm
            values={values}
            handleChange={handleChange}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </Box>
    </Box>
  );
}
