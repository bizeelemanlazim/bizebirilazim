import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BblSelect from './common/BblSelect';

type MyAppealsHeaderProps = {
  count: number;
}

export default function MyAppealsHeader({ count }: MyAppealsHeaderProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const nav = useNavigate();
  const [filterValue, setFilterValue] = useState('active');

  useEffect(() => {
    if (filterValue === 'all') {
      nav('/my-appeals');
    } else if (filterValue === 'active') {
      nav('/my-appeals?status=active');
    } else if (filterValue === 'passive') {
      nav('/my-appeals?status=passive');
    }
  }, [filterValue])

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
              {count} Adet İlan Bulundu
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            fontSize={14}
            fontWeight={500}
          >
            Aktif olarak değerlendirilen başvurularınız.
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
        <BblSelect
          label=''
          items={[
            { name: 'Aktif İlanlar', id: 'active' },
            { name: 'Pasif İlanlar', id: 'passive' },
          ]}
          onSelect={(value) => { setFilterValue(value) }}
          value={filterValue}
          sx={{
            width: 150,
          }}
        />
      </Box>
    </Box>
  )
}

