import { Box, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import BblTabs from '../components/common/BblTabs';
import EmployeePersonelInfoForm from '../components/EmployeePersonelInfoForm';
import EmployeeJobExperienceForm from '../components/EmployeeJobExperienceForm';
import EmployeeEducationInfoForm from '../components/EmployeeEducationInfoForm';
import EmployeeQualificationForm from '../components/EmployeeQualificationForm';
import EmployeeSocialMediaForm from '../components/EmployeeSocialMediaForm';
import EmployeeBankInfoForm from '../components/EmployeeBankInfoForm';
import EmployeeSkillForm from '../components/EmployeeSkillForm';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmployeeSettingsContainer() {

  const allTabs = ['personelInfo', 'jobExperience', 'educationInfo', 'qualifications', 'skills', 'socialMedia', 'bankInfo'];

  const [activeTab, setActiveTab] = useState('personelInfo');
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const loc = useLocation();
  const nav = useNavigate();
  const qs = new URLSearchParams(loc.search);

  const handleTabChange = (e: any, item: string) => {
    nav(`/settings?tab=${item}`, { replace: true });
  }

  useEffect(() => {
    const tab = qs.get('tab');
    if (tab && allTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [qs])

  const getLabelName = (slug: string) => {
    switch (slug) {
      case 'personelInfo':
        return matchesSm ? 'Kişisel' : 'Kişisel Bilgiler';
      case 'jobExperience':
        return matchesMd ? 'Deneyim' : 'İş Deneyimleri';
      case 'educationInfo':
        return matchesMd ? 'Eğitim' : 'Eğitim Bilgileri';
      case 'skills':
        return matchesMd ? 'Beceriler' : 'Beceriler';
      case 'qualifications':
        return matchesMd ? 'Nitelikler' : 'Nitelikler';
      case 'socialMedia':
        return matchesSm ? 'Sosyal' : 'Sosyal Medya';
      case 'bankInfo':
        return matchesSm ? 'Banka' : matchesMd ? 'Özlük' : 'Özlük Bilgileri';
      default:
        return '';
    }
  }

  const handleNext = async () => {
    if (activeTab === 'personelInfo') {
      nav('/settings?tab=jobExperience', { replace: true });
    } else if (activeTab === 'jobExperience') {
      nav('/settings?tab=educationInfo', { replace: true });
    } else if (activeTab === 'educationInfo') {
      nav('/settings?tab=qualifications', { replace: true });
    } else if (activeTab === 'qualifications') {
      nav('/settings?tab=skills', { replace: true });
    } else if (activeTab === 'skills') {
      nav('/settings?tab=socialMedia', { replace: true });
    } else if (activeTab === 'socialMedia') {
      nav('/settings?tab=bankInfo', { replace: true });
    } else if (activeTab === 'bankInfo') {
      nav('/settings?tab=personelInfo', { replace: true });
    }
  }

  const handleBack = async () => {
    if (activeTab === 'jobExperience') {
      nav('/settings?tab=personelInfo', { replace: true });
    } else if (activeTab === 'educationInfo') {
      nav('/settings?tab=jobExperience', { replace: true });
    } else if (activeTab === 'qualifications') {
      nav('/settings?tab=educationInfo', { replace: true });
    } else if (activeTab === 'skills') {
      nav('/settings?tab=qualifications', { replace: true });
    } else if (activeTab === 'socialMedia') {
      nav('/settings?tab=skills', { replace: true });
    } else if (activeTab === 'bankInfo') {
      nav('/settings?tab=socialMedia', { replace: true });
    }
  }

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'İş Arayan Profili', to: '/profile' },
          { label: 'Ayarlar' },
        ]}
      />
      <BblTabs
        sx={{ mt: 2 }}
        value={activeTab}
        onChange={handleTabChange}
        items={[
          { label: getLabelName('personelInfo'), slug: 'personelInfo' },
          { label: getLabelName('jobExperience'), slug: 'jobExperience' },
          { label: getLabelName('educationInfo'), slug: 'educationInfo' },
          { label: getLabelName('qualifications'), slug: 'qualifications' },
          { label: getLabelName('skills'), slug: 'skills' },
          { label: getLabelName('socialMedia'), slug: 'socialMedia' },
          { label: getLabelName('bankInfo'), slug: 'bankInfo' },
        ]}
      />
      {activeTab === 'personelInfo' && <EmployeePersonelInfoForm handleNext={handleNext} />}
      {activeTab === 'jobExperience' && <EmployeeJobExperienceForm handleNext={handleNext} handleBack={handleBack} />}
      {activeTab === 'educationInfo' && <EmployeeEducationInfoForm handleNext={handleNext} handleBack={handleBack} />}
      {activeTab === 'qualifications' && <EmployeeQualificationForm handleNext={handleNext} handleBack={handleBack} />}
      {activeTab === 'skills' && <EmployeeSkillForm handleNext={handleNext} handleBack={handleBack} />}
      {activeTab === 'socialMedia' && <EmployeeSocialMediaForm handleNext={handleNext} handleBack={handleBack} />}
      {activeTab === 'bankInfo' && <EmployeeBankInfoForm />}
    </Box>
  )
}
