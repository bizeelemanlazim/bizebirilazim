import { Avatar, Box, Rating, TableCell, TableRow, Typography, useTheme } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { RateType } from '../utils/types'
import { formatDate } from '../utils/utils'
import BblButton from './common/BblButton'

type RatingsTableRowItemProps = {
  rate: RateType
  type: 'my' | 'their';
  handleCommentClick: (rate: RateType) => void;
}

export default function RatingsTableRowItem({ rate, type, handleCommentClick }: RatingsTableRowItemProps) {

  const theme = useTheme()
  const { image } = useContext(AuthContext);

  return (
    <>
      <TableRow
        sx={{
          '& > *': {
            borderBottom: 'none !important',
          },
        }}
      >
        <TableCell
          sx={{
            display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
          }}>
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
            variant="body2">
            #{rate.applyForJobId}
          </Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Avatar
              src={image}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {rate.firstName} {rate.lastName}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell
          sx={{
            display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            {formatDate(rate.startDate)}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            {formatDate(rate.endDate)}
          </Typography>
        </TableCell>
        <TableCell>
          {rate.rate ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Rating
                sx={{ mt: 1 }}
                name="size-large"
                value={rate.rate}
                size="small"
                readOnly
              />
              {type === 'my' && (<BblButton
                label='Düzenle'
                variant='contained'
                size='small'
                onClick={() => { handleCommentClick(rate) }}
              />)}
            </Box>
          ) : (
            <BblButton
              label='Puan ve Yorum Ekle'
              variant='contained'
              size='small'
              onClick={() => { handleCommentClick(rate) }}
            />
          )}
        </TableCell>
      </TableRow >
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '14px',
            p: 2,
            background: theme.palette.primary.main + '1A',
            gap: 1,
            m: 2
          }}>
            <Typography>{rate.comment || 'Yorum yok'}</Typography>
          </Box>
        </TableCell>
      </TableRow>
    </>

  )
}
