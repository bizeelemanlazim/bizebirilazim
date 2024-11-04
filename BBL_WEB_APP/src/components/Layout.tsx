import React from 'react'
import MyAppBar from './MyAppBar'
import Footer from './Footer'
import { Box, useTheme } from '@mui/material'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ height: {xs:56, sm: 64, md:73.75 } }} />
      <MyAppBar />
      <Box
        sx={{
          flex: 1,
          mb:4
        }}
      >
        {children}
      </Box>
      <Footer />
    </div>
  )
}
