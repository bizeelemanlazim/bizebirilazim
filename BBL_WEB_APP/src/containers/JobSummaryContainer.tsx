import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material'
import React from 'react'
import BblBreadCrumbs from '../components/BblBreadCrumbs'
import JobSummaryHeader from '../components/JobSummaryHeader'
import ViewLayout from '../components/common/ViewLayout'
import JobSummaryTable from '../components/JobSummaryTable'
import BblButton from '../components/common/BblButton'

type JobSummaryContainerProps = {
  id: number;
}

export default function JobSummaryContainer({ id }: JobSummaryContainerProps) {

  const theme = useTheme();

  return (
    <Box>
      <ViewLayout>
        <BblBreadCrumbs
          items={[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'İlanlarım', to: '/my-jobs' },
            { label: 'İş Özeti' }
          ]}
        />
      </ViewLayout>
      <JobSummaryHeader />
      <ViewLayout>
        <JobSummaryTable />
        {/* <FormControlLabel
          control={
            <Checkbox
            />
          }
          label={
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: '12px',
              }}
            >
              <span style={{ color: theme.palette.primary.main }}>Geçici İş Sözleşmesi</span>'ni okudum, onaylıyorum.
            </Typography>
          }
        /> */}
        {/* <BblButton
          label='Siparişi Tamamla'
          variant='contained'
          onClick={() => { }}
          sx={{
            width: '100%'
          }}
        /> */}
      </ViewLayout>
    </Box>
  )
}
