import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import BblIcon from './common/BblIcon'
import { ReactComponent as MyRatingsIcon } from '../assets/my-ratings-icon.svg';
import { ReactComponent as TheirRatingsIcon } from '../assets/their-ratings-icon.svg';
import BblButton from './common/BblButton';
import RatingsTableRowItem from './RatingsTableRowItem';
import { RateType } from '../utils/types';
type RatingsTableProps = {
  type: 'my' | 'their';
  rates?: RateType[];
  isLoading?: boolean;
  handleCommentClick: (rate: RateType) => void;
}

export default function RatingsTable({ type, rates, isLoading, handleCommentClick }: RatingsTableProps) {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <BblIcon Icon={type === 'their' ? TheirRatingsIcon : MyRatingsIcon} />
        <Box ml={2}>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 'bold',
              fontSize: '17px',
            }}
          >
            {type === 'their' ? 'Yapılan Değerlendirmeler' : 'Yaptığım Değerlendirmeler'}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: '14px',
            }}
          >
            {type === 'their' ? 'Çalışanların sana karşı yaptığı değerlendirmeler.' : 'Senin yaptığın değerlendirmeler.'}
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{
          my: 2,
        }}
      >
        <TableContainer style={{ overflowX: 'initial' }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead
              sx={{
                '& th': {
                  backgroundColor: 'transparent !important'
                }
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
                  }}
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>İlan No</Typography>
                </TableCell>
                <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Çalışan Ad Soyad</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
                  }}
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Tarih</Typography>
                </TableCell>
                <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Değerlendirme</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rates?.map((rate, index) => (
                  <RatingsTableRowItem
                    key={index}
                    rate={rate}
                    type={type}
                    handleCommentClick={handleCommentClick}
                  />
                ))
              }
            </TableBody>
          </Table>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
              width: '100%',
            }}
          >
            <Box ml={2}>
              <Typography sx={{ fontSize: 12 }}>Sayfa 1/10</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                mr: 2
              }}
            >
              <BblButton
                label='Geri'
                variant='contained'
                size='small'
                onClick={() => { }}
                sx={{
                  height: 30,
                }}
              />
              <BblButton
                label='İleri'
                variant='contained'
                size='small'
                onClick={() => { }}
                sx={{
                  height: 30,
                }}
              />
            </Box>
          </Box>
        </TableContainer>
      </Paper>
    </Box>
  )
}
