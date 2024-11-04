import { Box, FormControlLabel, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import BblButton from './common/BblButton';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BblSelect from './common/BblSelect';

type AppealHeaderProps = {
  count: number,
}

export default function AppealHeader({ count }: AppealHeaderProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const nav = useNavigate();
  const [filterValue, setFilterValue] = useState('all');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        justifyContent: matches ? 'space-between' : 'center',
        alignItems: matches ? 'center' : 'flex-start',
        gap: 2,
        px: 3
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography fontSize={matches ? 16 : 10} fontWeight={700}>Başvurular</Typography>
          <Box
            sx={{
              backgroundColor: '#CBEFFF',
              borderRadius: '16px',
              px: 1,
              py: 0.25
            }}
          >
            <Typography
              fontSize={14}
              fontWeight={500}
              color="primary"
            >
              {count} Adet Başvuru Bulundu
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            fontSize={14}
            fontWeight={500}
          >
            Başvuruları inceleyip, değerlendirme yapabilirsiniz.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
          alignItems: matches ? 'center' : 'flex-start',
          gap: matches ? 1 : 0
        }}
      >
        {/* <BblSelect
          label=''
          items={[
            { id: 'Tüm İlanlar', name: 'all' },
            { id: 'Aktif İlanlar', name: 'active' },
            { id: 'Pasif İlanlar', name: 'passive' },
          ]}
          onSelect={(value) => { setFilterValue(value) }}
          value={filterValue}
          sx={{
            width: 150,
          }}
        /> */}
        <BblButton
          label='İlan Oluştur'
          variant="contained"
          onClick={() => { nav('/my-jobs/new') }}
          preIcon={<Add />}
        />
      </Box>
    </Box>
  )
}
