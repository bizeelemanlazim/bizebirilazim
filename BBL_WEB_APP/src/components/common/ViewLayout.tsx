import { Box } from '@mui/material'
import React from 'react'

type ViewLayoutProps = {
  children: React.ReactNode
}

export default function ViewLayout({ children }: ViewLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          px: 2
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
