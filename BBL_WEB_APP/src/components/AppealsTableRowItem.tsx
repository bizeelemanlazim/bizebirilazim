import { Check } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Avatar, Box, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AppealType } from '../utils/types';
import BblButton from './common/BblButton';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type AppealsTableRowItemProps = {
  handleOpen: (appeal: AppealType) => void;
  appeal: AppealType;
  handleAccept: (appeal: AppealType) => void;
  hasAnyApply?: boolean;
}

export default function AppealsTableRowItem({ hasAnyApply, handleOpen, appeal, handleAccept }: AppealsTableRowItemProps) {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { image } = useContext(AuthContext);

  return (
    <TableRow>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Avatar src={appeal.image} alt={appeal.image} />
          <Box>
            <Typography sx={{ fontSize: { sm: 12, md: 14 }, fontWeight: 700 }}>{appeal.name}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell

        align='left'>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: '14px',
          }}
        >
          {appeal.age || '-'}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'table-cell', md: 'table-cell' },
        }}
        align='left'>
        <Typography style={{ fontSize: 14 }}>
          {appeal.gender}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'table-cell', md: 'table-cell' },
        }}
        align='left'>
        <Typography style={{ fontSize: 14, fontWeight: 500 }}>
          {appeal.city}
        </Typography>
      </TableCell>
      <TableCell sx={{
        display: { xs: 'none', sm: 'table-cell', md: 'table-cell' },
      }} align='left'>
        <Typography style={{ fontSize: 14 }}>
          {appeal.nationality}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        {
          matches ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'flex-end'
              }}
            >
              <BblButton
                label='Onay Süreci'
                onClick={() => { handleAccept(appeal) }}
                variant='contained'
                size="small"
                disabled={hasAnyApply && !appeal.isApply}
                preIcon={appeal.isApply && <Check sx={{ fontSize: 14 }} />}
                sx={{
                  height: 20,
                  fontSize: 12,
                  whiteSpace: 'nowrap',
                  display: { xs: 'none', sm: 'table-cell', md: 'flex' }
                }}
              />
              <BblButton
                label='Özgeçmiş Görüntüleme'
                onClick={() => { handleOpen(appeal) }}
                variant='contained'
                size="small"
                preIcon={<HelpOutlineIcon sx={{ fontSize: 14 }} />}
                sx={{
                  height: 20,
                  fontSize: 12,
                  whiteSpace: 'nowrap',
                  display: { xs: 'none', sm: 'table-cell', md: 'flex' }
                }}
              />
              {/* <BblButton
                onClick={() => { }}
                variant='contained'
                size="medium"
                iconButton
                icon={<CancelOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  height: 20,
                  width: 20,
                  p: 0.5
                }}
              /> */}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <BblButton
                  onClick={() => { handleAccept(appeal) }}
                  variant='contained'
                  size="medium"
                  iconButton
                  icon={<Check sx={{ fontSize: 16 }} />}
                  sx={{
                    height: 20,
                    width: 20,
                    p: 0.5
                  }}
                />
                <BblButton
                  onClick={() => { handleOpen(appeal) }}
                  variant='contained'
                  size="medium"
                  iconButton
                  icon={<HelpOutlineIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    height: 20,
                    width: 20,
                    p: 0.5
                  }}
                />
              </Box>
              {/* <BblButton
                onClick={() => { }}
                variant='contained'
                size="medium"
                iconButton
                icon={<CancelOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  height: 20,
                  width: 20,
                  p: 0.5
                }}
              /> */}
            </Box>
          )
        }
      </TableCell>
    </TableRow>
  )
}
