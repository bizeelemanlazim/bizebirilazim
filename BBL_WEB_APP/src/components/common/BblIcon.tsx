import { Box, useTheme } from '@mui/material'
import React, { ReactComponentElement } from 'react'

type BblIconProps = {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text?: React.ReactNode
}

export default function BblIcon({ Icon, text }: BblIconProps) {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          background: '#83C9E8',
          border: `4px solid #DAEFF8`,
          borderRadius: '28px',
          width: '52px !important',
          height: '52px !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Icon && <Icon
          style={{
            width: '24px',
            height: '24px',
            fill: theme.palette.primary.dark,
            opacity: 1
          }}
        />}
        {text && <Box
          sx={{
            opacity: 1,
          }}
        >
          {text}
        </Box>
        }
      </Box>
    </Box>
  )
}
