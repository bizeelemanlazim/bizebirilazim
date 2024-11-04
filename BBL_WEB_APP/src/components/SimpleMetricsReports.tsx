import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function MetricItem({ label, count, background, rate }: { label: string, count: string, background: string, rate: string }) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const matches1 = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        background: background,
        borderRadius: '16px',
        p: 2,
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        alignItems: matches ? 'center' : 'center',
        gap: 2,
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          fontSize={14}
          fontWeight={700}
        >
          {label}
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={matches1 ? 33 : 33}
        >
          {count}
        </Typography>
      </Box>
      <Typography>
        {rate}
        <TrendingUpIcon />
      </Typography>
    </Box>
  )
}

export default function SimpleMetricsReports() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      mt={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3}>
          <MetricItem
            label="Görüntüleme"
            count="712K"
            background='#E3F5FF'
            rate="+11.01%"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <MetricItem
            label="Ziyaret"
            count="367K"
            background='#E5ECF6'
            rate="+9.15%"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <MetricItem
            label="Yeni Kullanıcı"
            count="3,456"
            background='#E3F5FF'
            rate="+1201%"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>

          <MetricItem
            label="Aktif Kullanıcı"
            count="10K"
            background='#E5ECF6'
            rate="+19.15%"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
