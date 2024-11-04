import { ArrowDownward } from '@mui/icons-material'
import { TableContainer, Table, TableHead, TableRow, TableCell, Typography, Box, TableBody, TableFooter, Divider, CircularProgress } from '@mui/material'
import React from 'react'
import JobsTableRowItem from './JobsTableRowItem'
import BblButton from './common/BblButton'
import { DetailAds } from '../utils/types'

type JobsTableProps = {
  jobs: DetailAds[];
  isLoading?: boolean;
  handleDeleteClick: (job: DetailAds) => void;
  active: boolean;
  handleOrderChangeClick: (att: string) => void;
  nameOrder: string;
  dateOrder: string;
}

export default function JobsTable({ active, jobs, isLoading, handleDeleteClick, handleOrderChangeClick, nameOrder, dateOrder }: JobsTableProps) {
  return (
    isLoading ? <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
      }}
    >
      <CircularProgress />
    </Box> :
      <>
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
                    onClick={() => handleOrderChangeClick('name')}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>İlan İsmi</Typography>
                    <ArrowDownward
                      sx={{
                        rotate: nameOrder.includes('desc') ? '0deg' : '180deg',
                        height: 14,
                        width: 14,
                        color: 'text.secondary',
                        ml: 0.5
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: 'none', sm: 'none', md: 'table-cell' }
                  }}
                  align='left'>
                  <Box
                    onClick={() => handleOrderChangeClick('date')}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>İşin Başlama-Bitiş Tarihi</Typography>
                    <ArrowDownward
                      sx={{
                         rotate: dateOrder.includes('desc') ? '0deg' : '180deg',
                        height: 14,
                        width: 14,
                        color: 'text.secondary',
                        ml: 0.5
                      }}
                    />
                  </Box>
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
                  <JobsTableRowItem key={index} job={item} handleDeleteClick={handleDeleteClick} active={active} />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>

  )
}
