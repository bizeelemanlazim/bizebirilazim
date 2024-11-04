import { ArrowDownward } from '@mui/icons-material'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { DetailAds } from '../utils/types'
import MyAppealsTableRowItem from './MyAppealsTableRowItem'
import BblButton from './common/BblButton'

type MyAppealsTableProps = {
  jobs: DetailAds[];
  handleCancelJobAppeal: (job: DetailAds) => void;
}

export default function MyAppealsTable({ jobs, handleCancelJobAppeal }: MyAppealsTableProps) {
  return (
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
                display: 'table-cell',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: 12 }}>İlan İsmi</Typography>
                <ArrowDownward sx={{ height: 14, width: 14, color: 'text.secondary', ml: 0.5 }} />
              </Box>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'none', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>İşin Başlama-Bitiş Tarihi</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'none', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Mesai Süresi / Saat</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'none', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Mesai Başlama Saati</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'none', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Nitelikler</Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography sx={{ fontSize: 12 }}>Ücret</Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography sx={{ fontSize: 12 }}>İşlemler</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            jobs.map((item, index) => (
              <MyAppealsTableRowItem
                handleCancelJobAppeal={handleCancelJobAppeal}
                key={index}
                job={item}
              />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
