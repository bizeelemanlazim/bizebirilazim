import React from 'react'
import { BreadCrumbItem } from '../utils/types'
import { Box, Breadcrumbs, SxProps, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type BBlBreadCrumbsProps = {
  items: BreadCrumbItem[];
  sx?: SxProps;
}

export default function BblBreadCrumbs({ items, sx }: BBlBreadCrumbsProps) {

  const nav = useNavigate();

  return (
    <Box>
      <Breadcrumbs
        separator=">"
        aria-label="breadcrumb"
        sx={{
          ...sx,
          mt: 4,
        }}
      >
        {items.map((item, index) => (
          <Typography
            key={index}
            onClick={() => item.to && nav(item.to)}
            sx={{
              fontSize: { xs: '10px', sm: '16px' },
              color: item.to ? 'text.secondary' : 'text.primary',
              cursor: item.to ? 'pointer' : 'default',
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  )
}
