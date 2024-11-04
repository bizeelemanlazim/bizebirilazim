import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import React, { useContext } from 'react'
import useSWR, { mutate } from 'swr'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import DeleteDialog from '../components/DeleteDialog'
import MyAppealsHeader from '../components/MyAppealsHeader'
import MyAppealsTable from '../components/MyAppealsTable'
import BblButton from '../components/common/BblButton'
import { AuthContext } from '../contexts/AuthContext'
import { cancelAppeal } from '../services/AdsServices'
import { baseUrl } from '../utils/constants'
import { fetcher } from '../utils/global'
import { ApiList, DetailAds } from '../utils/types'
import { useLocation } from 'react-router-dom'

export default function MyAppealsContainer() {

  const { token } = useContext(AuthContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<DetailAds>();
  const [page, setPage] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const queryStatus = query.get('status');
  const isActive = queryStatus === 'passive' ? false : true;

  const { data: appeals, isLoading } = useSWR<ApiList<DetailAds>>(
    `${baseUrl}/api/employee-management/apply-for-a-job?isActive=${isActive}&skip=${page * 10}&take=10`,
    (url: string) => fetcher(url, token)
  );

  React.useEffect(() => {
    if (appeals?.data.totalCount) {
      setTotal(appeals.data.totalCount);
    }
  }, [appeals]);

  const handleCancelJobAppeal = async (job: DetailAds) => {
    try {
      setDeleting(true);
      const res = await cancelAppeal(token, job.detailAdModel.id)
      if (res.isSuccess) {
        setDeleteDialogOpen(false);
        mutate(`${baseUrl}/api/employee-management/apply-for-a-job?isActive=${isActive}&skip=${page * 10}&take=10`);
        enqueueSnackbar('Başvuru başarıyla silindi.', { variant: 'success' });
      } else {
        enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
    } finally {
      setDeleting(false);
      setSelectedJob(undefined);
      setDeleteDialogOpen(false);
    }
  }

  const handleCancelClick = (job: DetailAds) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  }

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Başvurularım' },
        ]}
      />
      <Paper
        sx={{
          pt: 3,
          pb: 1,
          my: 3
        }}
      >
        <MyAppealsHeader
          count={appeals?.data.totalCount || 0}
        />
        <Divider sx={{ mt: 2 }} />
        {
          appeals ? (
            <>
              <MyAppealsTable
                jobs={appeals.data.data}
                handleCancelJobAppeal={handleCancelClick}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  width: '100%',
                }}
              >
                <Box ml={2}>
                  <Typography sx={{ fontSize: 12 }}>
                    {`Sayfa ${page + 1}/${Math.ceil(total / 10)}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    mr: 2
                  }}
                >
                  <BblButton
                    label='Geri'
                    variant='contained'
                    size='small'
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
                    label='İleri'
                    variant='contained'
                    size='small'
                    onClick={() => {
                      if (page < Math.ceil(total / 10) - 1) {
                        setPage(page + 1);
                      }
                    }}
                    sx={{
                      height: 30,
                    }}
                  />
                </Box>
              </Box>
            </>

          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </Box>
          )
        }
      </Paper>
      <DeleteDialog
        title='Başvuruyu Sil'
        description='Bu başvuruyu silmek istediğinize emin misiniz?'
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleCancelJobAppeal(selectedJob!)}
        deleting={deleting}
      />
    </Box>
  )
}
