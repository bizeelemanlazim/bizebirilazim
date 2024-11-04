import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppealHeader from '../components/AppealHeader'
import AppealsTable from '../components/AppealsTable'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import { AuthContext } from '../contexts/AuthContext'
import { getJobAppeals } from '../services/AdsServices'
import { ApiList, AppealType } from '../utils/types'
import useSWR from 'swr'
import { baseUrl } from '../utils/constants'
import { fetcher } from '../utils/global'
import BblButton from '../components/common/BblButton'

export default function AppealsContainer() {

  // const [appeals, setAppeals] = React.useState<AppealType[]>();
  const { token } = React.useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // React.useEffect(() => {
  //   const getAppeals = async () => {
  //     const response = await getJobAppeals(token, id!);
  //     response?.data ? setAppeals(response.data.data) : setAppeals([]);
  //   }
  //   getAppeals();
  // }, []);

  // const { data: myJobs, isLoading } = useSWR<ApiList<DetailAds>>(
  //   `${baseUrl}/api/advertisement-management/advertisement-and-order-summary?isActive=${active}&skip=${page * 10}&take=10`,
  //   (url: string) => fetcher(url, token)
  // );

  const { data: appeals, isLoading } = useSWR<ApiList<AppealType>>(
    `${baseUrl}/api/advertisement-management/apply-for-a-job?isActive=true&AdId=${id}&skip=${page * 10}&take=10`,
    (url: string) => fetcher(url, token)
  );

  useEffect(() => {
    if (appeals?.data.totalCount) {
      setTotal(appeals.data.totalCount);
    }
  }, [appeals]);

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Başvurular' },
        ]}
      />
      <Paper
        sx={{
          pt: 3,
          pb: 1,
          my: 3
        }}
      >
        <AppealHeader
          count={appeals?.data.totalCount || 0}
        />
        <Divider sx={{ mt: 2 }} />
        {
          appeals ? (
            <>
              <AppealsTable
                appeals={appeals.data.data}
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
    </Box>
  )
}
