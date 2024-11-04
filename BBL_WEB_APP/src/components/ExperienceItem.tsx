import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import BblButton from './common/BblButton'
import { DeleteOutline, Edit, EditOutlined } from '@mui/icons-material'

type ExperienceItemProps = {
  title: string,
  subtitle: string,
  date: string,
  description: string,
  onEdit?: () => void,
  onDelete?: () => void,
}

export default function ExperienceItem({ title, subtitle, date, description, onEdit, onDelete }: ExperienceItemProps) {

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
      <Box
        sx={{
          maxWidth: '150px',
          width: '100%',
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontSize: '17px',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
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
            {subtitle}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              color: 'text.secondary'
            }}
          >
            {date}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            flexGrow: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: 'text.secondary',
              width: '100%',
            }}

          >
            {description}
          </Typography>
        </Box>
      </Box>
      {(onDelete && onEdit) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
            gap: 1,
          }}
        >
          <BblButton
            label="Düzenle"
            preIcon={<EditOutlined sx={{ height: 18 }} />}
            icon={<Edit />}
            iconButton={!matches}
            variant="contained"
            onClick={() => { onEdit() }}
            size={matches ? 'medium' : 'small'}
            sx={{
              height: 'fit-content',
              p: 1
            }}
          />
          <BblButton
            label="Sil"
            preIcon={<DeleteOutline sx={{ height: 18 }} />}
            icon={<DeleteOutline />}
            iconButton={!matches}
            variant="contained"
            onClick={() => { onDelete() }}
            size={matches ? 'medium' : 'small'}
            sx={{
              height: 'fit-content',
              p: 1
            }}
          />
        </Box>
      )}
    </Box>
  )
}
