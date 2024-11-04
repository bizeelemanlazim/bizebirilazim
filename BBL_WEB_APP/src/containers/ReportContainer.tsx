import { Box } from '@mui/material'
import React, { useContext } from 'react'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import SimpleMetricsReports from '../components/SimpleMetricsReports'
import { PieChart } from '../components/PieChart'
import { BarChart } from '../components/BarChart'
import { AuthContext } from '../contexts/AuthContext'

export default function ReportContainer() {

  const {role} = useContext(AuthContext);

  const fetchReports = () => {
    
  }

  return (
    <Box>
      <BblBreadCrumbs
        items={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Raporlar' },
        ]}
      />
      <SimpleMetricsReports />
      <Box
        sx={{
          height: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4
        }}
      >
        <PieChart />
      </Box>
      <Box
        sx={{
          height: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4
        }}
      >
        <BarChart />
      </Box>
    </Box>
  )
}
