import { DeleteOutline, Edit, EditOutlined } from '@mui/icons-material'
import { Box, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import BblButton from './common/BblButton'

type SkillItemProps = {
  // title={item.abilityName}
  // rate={item.degree}
  // description={item.description}
  // onEdit={() => handleEditClick(item)}
  // onDelete={() => handleDeleteClick(item.id!)}
  title: string,
  rate: number,
  description: string,
  onEdit?: () => void,
  onDelete?: () => void,
}

export default function SkillItem({ title, rate, description, onEdit, onDelete }: SkillItemProps) {

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
          <Rating
            name="read-only"
            value={rate}
            readOnly
            sx={{
              fontSize: '24px',
              color: 'primary.dark',
            }}
          />
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
