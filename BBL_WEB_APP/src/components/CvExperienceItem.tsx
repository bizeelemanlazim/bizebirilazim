import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import BblButton from './common/BblButton'
import { DeleteOutline, Edit, EditOutlined } from '@mui/icons-material'

export default function CvExperienceItem() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
      }}
    >
      <Box>
        <Typography
          color="primary"
          sx={{
            fontSize: '17px',
            fontWeight: 500
          }}
        >
          Junier Designer
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'flex-start', sm: 'center', md: 'center', lg: 'center', xl: 'center' },
          }}
        >
          <Typography>
            Ayparasun Dijital Ajans
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              color: 'text.secondary'
            }}
          >
            Ocak 2017 --- Aralık 2020
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'text.secondary'
            }}

          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. Praesent lorem orci, mattis non efficitur id, ultricies vel nibh.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
