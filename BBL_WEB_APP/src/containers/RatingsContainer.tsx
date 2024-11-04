import { Box, Tab, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import BblBreadCrumbs from '../components/BblBreadCrumbs';
import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import RatingsTable from '../components/RatingsTable';
import useSWR, { mutate } from 'swr';
import BblTabs from '../components/common/BblTabs';
import { RateType } from '../utils/types';
import { baseUrl } from '../utils/constants';
import { fetcher } from '../utils/global';
import { AuthContext } from '../contexts/AuthContext';
import RateDialog from '../components/RateDialog';
import { sendRate, updateRate } from '../services/AdsServices';
import { enqueueSnackbar } from 'notistack';

export default function RatingsContainer() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [value, setValue] = React.useState('1');
  const { token, role } = useContext(AuthContext);
  const myUrl = role === 'Employer' ? `${baseUrl}/api/employer-management/my-ratings` : `${baseUrl}/api/employee-management/my-ratings`;
  const theirUrl = role === 'Employer' ? `${baseUrl}/api/employer-management/employee-ratings` : `${baseUrl}/api/employee-management/employer-ratings`;
  const [openRateDialog, setOpenRateDialog] = React.useState(false);
  const [selectedRate, setSelectedRate] = React.useState<RateType | null>(null);
  const [commentSending, setCommentSending] = React.useState(false);

  const handleCommitSubmit = async (values: any) => {
    try {
      setCommentSending(true);
      if (selectedRate?.rate === 0) {

        const rateValues = {
          applyForJobId: selectedRate?.applyForJobId,
          rate: values.rate,
          comment: values.comment,
        }
        const res = await sendRate(token, rateValues, role as 'Employee' | 'Employer');
        if (res.isSuccess) {
          mutate(myUrl);
          enqueueSnackbar('Değerlendirme başarıyla yapıldı.', { variant: 'success' });
        } else {
          console.log(res);
          enqueueSnackbar('Değerlendirme yapılırken bir hata oluştu.', { variant: 'error' });
        }
      } else {
        const rateValues = {
          rate: values.rate,
          comment: values.comment,
        }
        const res = await updateRate(token, selectedRate?.id, rateValues, role as 'Employee' | 'Employer');
        if (res.isSuccess) {
          mutate(myUrl);
          enqueueSnackbar('Değerlendirme başarıyla güncellendi.', { variant: 'success' });
        } else {
          console.log(res);
          enqueueSnackbar('Değerlendirme güncellenirken bir hata oluştu.', { variant: 'error' });
        }
      }
    } catch (e) {
      console.log(e);
      enqueueSnackbar('Değerlendirme yapılırken bir hata oluştu.', { variant: 'error' });
    } finally {
      setCommentSending(false);
    }
    setOpenRateDialog(false);
  }

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const { data: myRarings, isLoading: isLoadingMyRatings } = useSWR<{ data: RateType[] }>(
    myUrl,
    (url: string) => fetcher(url, token)
  );

  const { data: theirRarings, isLoading: isLoadingTheirRatings } = useSWR<{ data: RateType[] }>(
    theirUrl,
    (url: string) => fetcher(url, token)
  );

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Değerlendirmeler' },
        ]}
      />
      {
        matches ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mt: 4,
            }}
          >
            <RatingsTable
              type="their"
              rates={theirRarings?.data}
              isLoading={isLoadingTheirRatings}
              handleCommentClick={(rate: RateType) => {
                setSelectedRate(rate);
                setOpenRateDialog(true);
              }}
            />
            <RatingsTable
              rates={myRarings?.data}
              type="my"
              isLoading={isLoadingMyRatings}
              handleCommentClick={(rate: RateType) => {
                setSelectedRate(rate);
                setOpenRateDialog(true);
              }}
            />
          </Box>
        ) : (
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <BblTabs
                  items={[
                    { label: 'Yapılan Değerlendirmeler', slug: '1' },
                    { label: 'Yaptığım Değerlendirmeler', slug: '2' },
                  ]}
                  value={value}
                  onChange={handleChange}
                />
              </Box>
              <TabPanel
                sx={{ p: 1 }}
                value="1">
                <RatingsTable
                  type="their"
                  rates={theirRarings?.data}
                  isLoading={isLoadingTheirRatings}
                  handleCommentClick={(rate: RateType) => {
                    setSelectedRate(rate);
                    setOpenRateDialog(true);
                  }}
                />
              </TabPanel>
              <TabPanel
                sx={{ p: 1 }}
                value="2"
              >
                <RatingsTable
                  type="my"
                  rates={myRarings?.data}
                  isLoading={isLoadingMyRatings}
                  handleCommentClick={(rate: RateType) => {
                    setSelectedRate(rate);
                    setOpenRateDialog(true);
                  }}
                />
              </TabPanel>
            </TabContext>
          </Box>
        )
      }
      <RateDialog
        open={openRateDialog}
        onClose={() => setOpenRateDialog(false)}
        onSubmit={handleCommitSubmit}
        loading={commentSending}
        selectedRate={selectedRate}
        type={role as 'Employee' | 'Employer'}
      />
    </Box>
  )
}
