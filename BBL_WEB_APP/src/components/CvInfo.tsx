import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import DateIcon from '@mui/icons-material/DateRangeOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import GenderIcon from '@mui/icons-material/Person2Outlined';

type CvInfoProps = {
  cwInfo?: any;
}

export default function CvInfo({ cwInfo }: CvInfoProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        mx: { xs: 1, sm: 2, md: 3, lg: 4 }
      }}
      mt={1}
      gap={2}
    >
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 14, md: 16, lg: 16 },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700
          }}
        >
          <GenderIcon sx={{ fontSize: { xs: 18, sm: 22, md: 24, lg: 24 } }} />
          {matches && "Cinsiyet: "}
        </span>

        <span>
          {cwInfo.genderValue}
        </span>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 14, md: 16, lg: 16 },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700
          }}
        >
          <DateIcon sx={{ fontSize: { xs: 18, sm: 22, md: 24, lg: 24 } }} />
          {matches && "Yaş: "}
        </span>

        <span>
          {new Date().getFullYear() - cwInfo.age}
        </span>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 14, md: 16, lg: 16 },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700
          }}
        >
          <HomeIcon sx={{ fontSize: { xs: 18, sm: 22, md: 24, lg: 24 } }} />
          {matches && "Uyruk: "}
        </span>

        <span>
          {cwInfo.nationalityValue}
        </span>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 14, md: 16, lg: 16 },
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700
          }}
        >
          <LocationIcon sx={{ fontSize: { xs: 18, sm: 22, md: 24, lg: 24 } }} />
          {matches && "Lokasyon: "}
        </span>

        <span>
          {cwInfo.location}
        </span>
      </Typography>
    </Stack>
  )
}
