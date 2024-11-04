import { Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import employementIcon from '../assets/employment.png'
import React from 'react'
import ImgIcon from './common/ImgIcon'
import CancelIcon from '@mui/icons-material/CancelOutlined';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

type EmploymentCardItemProps = {
  title: string;
  options: number[];
  selected?: boolean;
}

export default function EmploymentCardItem({ title, options, selected }: EmploymentCardItemProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.main + '20',
        border: selected ? '1px solid ' + theme.palette.primary.main : '1px solid ' + theme.palette.primary.main + '20',
        display: 'flex',
        flexDirection: matches ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid ' + theme.palette.primary.main,
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            my: 2,
            ml: 2,
            height: '75px',
            width: '75px',
            background: 'white',
            borderRadius: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <ImgIcon
              style={{
                height: '50px',
              }}
              src={employementIcon}
              alt="Employment"
            />
          </Box>
        </Box>
        <Box>
          <Typography color="primary.dark" fontWeight={700}>
            {title}
          </Typography>
          <Typography color="primary.dark" fontWeight={700}>
            İlan Paketi
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mx: 2,
          width: matches ? '100%' : 'auto',
          p: 2
        }}
      >
        {options.map((option, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {option === 1 ? <CheckIcon sx={{ color: "primary.dark" }} /> : <CancelIcon sx={{ color: "primary.dark" }} />}
            <Typography noWrap sx={{ color: "primary.dark" }} >
              {optionsLabels[index]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}

const optionsLabels = [
  "30 Günlük Süre",
  "İlan Ücreti",
  "Akıllı İStihdam Hiz.",
  "Akıllı Ödeme Hiz."
]
