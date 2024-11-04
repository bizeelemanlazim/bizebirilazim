import { ArrowDownward } from '@mui/icons-material'
import { TableContainer, Table, TableHead, TableRow, TableCell, Typography, Box, TableBody, TableFooter, Divider } from '@mui/material'
import React, { useState } from 'react'
import BblButton from './common/BblButton'
import AppealsTableRowItem from './AppealsTableRowItem'
import EmployeeCVDialog from './EmployeeCVDialog'
import { AppealType } from '../utils/types'
import { acceptAppeal, finishAppeal } from '../services/AdsServices'
import { AuthContext } from '../contexts/AuthContext'
import { enqueueSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'

type AppealsTableProps = {
  appeals: AppealType[],
}

export default function AppealsTable({ appeals }: AppealsTableProps) {

  const [open, setOpen] = useState(false);
  const [selectedAppeal, setSelectedAppeal] = useState<AppealType>();
  const [sendingAccept, setSendingAccept] = useState(false);
  const { token } = React.useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = (appeal: AppealType) => {
    setOpen(true);
    setSelectedAppeal(appeal);
  }

  const handleAccept = async (appeal: AppealType) => {
    try {
      setSendingAccept(true);
      if (appeal.isApply) {
        const res = await finishAppeal(token, +id!);
        if (res.isSuccess) {
          enqueueSnackbar('İş tamamlandı olarak işaretlendi.', { variant: 'success' });
        } else {
          enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
        }
      } else {
        const res = await acceptAppeal(token, appeal.applyForJobId);
        if (res.isSuccess) {
          enqueueSnackbar('Başvuru kabul edildi.', { variant: 'success' });
        } else {
          enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
        }
      }
    }
    catch (error) {
      console.log(error)
      enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
    } finally {
      setSendingAccept(false);
      handleClose();
    }
  }

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
                <Typography sx={{ fontSize: 12 }}>Başvuran İsmi</Typography>
                <ArrowDownward sx={{ height: 14, width: 14, color: 'text.secondary', ml: 0.5 }} />
              </Box>
            </TableCell>
            <TableCell
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Yaş</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Cinsiyet</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Lokasyon</Typography>
            </TableCell>
            <TableCell
              sx={{
                display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }
              }}
              align='left'>
              <Typography sx={{ fontSize: 12 }}>Uyruk</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography sx={{ fontSize: 12 }}>İşlemler</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            appeals.map((appeal, index) => (
              <AppealsTableRowItem
                handleOpen={handleOpen}
                key={index}
                appeal={appeal}
                hasAnyApply={appeals.some((a) => a.isApply)}
                handleAccept={handleAccept}
              />
            ))
          }
        </TableBody>
      </Table>
      <EmployeeCVDialog
        open={open}
        onClose={handleClose}
        appeal={selectedAppeal}
        handleAccept={handleAccept}
        sendingAccept={sendingAccept}
      />
    </TableContainer>
  )
}
