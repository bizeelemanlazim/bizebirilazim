import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as StartIcon } from '../assets/star.svg';
import EmploymentCardItem from './EmploymentCardItem';
import BblButton from './common/BblButton';
import BblIcon from './common/BblIcon';
import { enqueueSnackbar } from 'notistack'

type PackageSelectionProps = {
  handleNext: () => void;
  insertAdsValues: any,
  handleChanceInsertAdsValues: (values: any) => void;
}

export default function PackageSelection({ handleNext, insertAdsValues, handleChanceInsertAdsValues }: PackageSelectionProps) {

  const handleSelect = (index: number) => {
    handleChanceInsertAdsValues({ workType: index.toString() });
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <BblIcon Icon={StartIcon} />
        <Box ml={2}>
          <Typography
            color="primary.dark"
            sx={{
              fontWeight: 'bold',
              fontSize: '21px',
            }}
          >
            Paket Seçimi
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: '14px',
            }}
          >
            İstihdam paketlerinden birini seçebilirsiniz.
          </Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => { handleSelect(1) }}
            >
              <EmploymentCardItem
                title="Bi'İlan"
                options={[1, 1, 0, 0]}
                selected={insertAdsValues?.workType && +insertAdsValues.workType === 1}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => { handleSelect(2) }}
            >
              <EmploymentCardItem
                title="Bi'Eleman"
                options={[1, 1, 1, 0]}
                selected={insertAdsValues?.workType && +insertAdsValues.workType === 2}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => { handleSelect(3) }}
            >
              <EmploymentCardItem
                title="Bi'Destek"
                options={[1, 1, 0, 1]}
                selected={insertAdsValues?.workType && +insertAdsValues.workType === 3}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              onClick={() => { handleSelect(4) }}
            >
              <EmploymentCardItem
                title="Bi'İstihdam"
                options={[1, 1, 1, 1]}
                selected={insertAdsValues?.workType && +insertAdsValues.workType === 4}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '10px',
          mt: 1
        }}
      >
        <BblButton
          label="İleri"
          variant='contained'
          onClick={() => {
            if (!insertAdsValues?.workType) {
              enqueueSnackbar('Lütfen bir paket seçiniz.', { variant: 'error' })
            } else {
              handleNext()
            }
          }}
        />
      </Box>
    </Box>
  )
}

const qualifications = [
  { title: 'HTML' },
  { title: 'CSS' },
  { title: 'JavaScript' },
  { title: 'React' },
  { title: 'Node.js' },
  { title: 'Express.js' },
  { title: 'MongoDB' },
  { title: 'SQL' },
  { title: 'TypeScript' },
  { title: 'Python' },]

