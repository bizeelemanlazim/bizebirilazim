import { Box, Chip } from '@mui/material'
import React from 'react'

type JobsTableRowItemQualificationChipProps = {
  icon: React.ReactElement
  label: string
}

export default function JobsTableRowItemQualificationChip({ icon, label }: JobsTableRowItemQualificationChipProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        borderRadius: '4px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        whiteSpace: 'nowrap',
        pr: 1,
        py: 0.5,
        px: 1,
        width: 'fit-content',
        fontSize: 10,
      }}
    >
      {icon}
      {label}
    </Box>
  )
}
