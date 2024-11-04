import { TableContainer, Table, TableHead, TableRow, TableCell, Typography, Box, TableBody, TableFooter, Divider, Paper, useTheme } from '@mui/material'

export default function JobSummaryTable() {
  const theme = useTheme();
  return (
    <Box
      mt={2}
    >
      <Typography
        sx={{
          flexDirection: 'row',
          gap: 1,
          display: { xs: 'flex', sm: 'flex', md: 'none' }
        }}
      >
        <span
          style={{
            color: theme.palette.text.secondary
          }}
        >
          Meslek:
        </span>
        <span>
          Dijital Tasarımcı
        </span>
      </Typography>
      <Paper
        sx={{
          my: 1
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
                    display: { xs: 'none', sm: 'none', md: 'table-cell' }
                  }}
                >
                  <Typography sx={{ fontSize: 12 }}>Meslek</Typography>
                </TableCell>
                <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Lokasyon</Typography>
                </TableCell>
                {/* <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Hakediş</Typography>
                </TableCell>
                <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Yasal Kesintiler</Typography>
                </TableCell>
                <TableCell
                  align='left'>
                  <Typography sx={{ fontSize: 12 }}>Komisyon Bedeli</Typography>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    display: { xs: 'none', sm: 'none', md: 'table-cell' }
                  }}
                >
                  <Typography fontSize={14} fontWeight={700}>
                    Dijital Tasarımcı
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>
                    Ankara / Batıkent
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography fontSize={14}>
                    8500
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>
                    1500
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>
                    1000
                  </Typography>
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box >
  )
}
