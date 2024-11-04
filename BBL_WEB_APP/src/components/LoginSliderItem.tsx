import { Box, Typography } from '@mui/material';
import React from 'react'

type LoginSliderItemProps = {
  src: string;
  label: string;
  name: string;
  location: string;
}

export default function LoginSliderItem({ src, label, name, location }: LoginSliderItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
          }}
          src={src}
          alt={src}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ mx: 3, textAlign: 'center' }} color="white">{label}</Typography>
        <Typography fontWeight={700} color="white">{name}</Typography>
        <Typography color="white">{location}</Typography>
      </Box>
    </Box>
  )
}
