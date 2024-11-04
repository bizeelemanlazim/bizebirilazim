import { DeleteOutline, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Box, IconButton, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/company-logo.png';
import { DetailAds } from '../utils/types';
import { convertTimeToHours, formatDateRange, formatTime } from '../utils/utils';
import JobsTableRowItemQualificationChip from './JobsTableRowItemQualificationChip';
import BblButton from './common/BblButton';
import ImgIcon from './common/ImgIcon';
import GeneralInfoDialog from './GeneralInfoDialog';
import { useState } from 'react';

type MyAppealsTableRowItemProps = {
  job: DetailAds;
  handleCancelJobAppeal: (job: DetailAds) => void;
}

export default function MyAppealsTableRowItem({ job, handleCancelJobAppeal }: MyAppealsTableRowItemProps) {
  const theme = useTheme();
  const nav = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

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
          <ImgIcon src={companyLogo} alt="company" />
          <Box>
            <Typography sx={{ fontSize: { sm: 12, md: 14 }, fontWeight: 700 }}>{job.detailOrderSummary.jobName}</Typography>
            <Typography sx={{ fontSize: { sm: 12, md: 14 }, fontWeight: 500 }}>Firma İsmi</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'none', md: 'table-cell' },
        }}
        align='left'>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: '14px',
          }}
        >
          {formatDateRange(job.detailAdModel.workStartDate, job.detailAdModel.workEndDate)}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'none', md: 'table-cell' },
        }}
        align='left'>
        <Typography style={{ fontSize: 14, fontWeight: 700, color: theme.palette.text.secondary }}>{convertTimeToHours(job.detailAdModel.workingTime)}</Typography>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'none', md: 'table-cell' },
        }}
        align='left'>
        <Typography style={{ fontSize: 14, fontWeight: 500 }}>{formatTime(job.detailAdModel.workingStartTime)}</Typography>
      </TableCell>
      <TableCell
        sx={{
          display: { xs: 'none', sm: 'none', md: 'table-cell' },
        }} align='left'>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}
        >
          <JobsTableRowItemQualificationChip
            icon={<AccessTimeIcon sx={{ color: 'white !important', height: 14 }} />}
            label='Tam Zamanlı'
          />
          <JobsTableRowItemQualificationChip
            icon={<Person2OutlinedIcon sx={{ color: 'white !important', height: 14 }} />}
            label='Kadın'
          />
          <JobsTableRowItemQualificationChip
            icon={<MenuBookOutlinedIcon sx={{ color: 'white !important', height: 14 }} />}
            label='Lisans Eğitimi'
          />
        </Box>
      </TableCell>
      <TableCell align='left'>
        <Typography style={{ fontSize: 14 }}>{job.detailOrderSummary.totalFees}</Typography>
      </TableCell>
      <TableCell align='left'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1
          }}
        >
          <BblButton
            label='Detayları Görüntüle'
            onClick={() => { setDetailDialogOpen(true)}}
            variant='contained'
            size="small"
            sx={{
              height: 20,
              fontSize: 12,
              whiteSpace: 'nowrap',
              display: { xs: 'none', sm: 'none', md: 'flex' }
            }}
          />
          <IconButton
            onClick={() => { }}
            sx={{
              display: { sm: 'flex', md: 'none' },
              p: 0,
              m: 0,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            <VisibilityOutlined sx={{ p: 0.5 }} />
          </IconButton>
          <IconButton
            onClick={() => { handleCancelJobAppeal(job) }}
            sx={{
              p: 0,
              display: 'flex',
              m: 0,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <DeleteOutline sx={{ p: 0.5 }} />
          </IconButton>
        </Box>
      </TableCell>
      <GeneralInfoDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        title="İş Detayları"
        content={job.detailAdModel.attribute}
      />
    </TableRow>
  )
}
