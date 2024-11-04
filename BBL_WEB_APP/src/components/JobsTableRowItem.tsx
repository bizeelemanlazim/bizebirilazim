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
import EngineeringIcon from '@mui/icons-material/Engineering';

type JobsTableRowItemProps = {
  job: DetailAds;
  handleDeleteClick: (job: DetailAds) => void;
  active?: boolean;
}

export default function JobsTableRowItem({ active, job, handleDeleteClick }: JobsTableRowItemProps) {

  const theme = useTheme();
  const nav = useNavigate();

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
          {job.detailAdModel.workType.length > 0 && (
            <JobsTableRowItemQualificationChip
              icon={<AccessTimeIcon sx={{ color: 'white !important', height: 14 }} />}
              label={job.detailAdModel.workType.map((workType) => workType.name).join(', ')}
            />)}
          {job.detailAdModel.gender.length > 0 && (
            <JobsTableRowItemQualificationChip
              icon={<Person2OutlinedIcon sx={{ color: 'white !important', height: 14 }} />}
              label={job.detailAdModel.gender.map((gender) => gender.name).join(', ')}
            />)}
          {job.detailAdModel.education && (
            <JobsTableRowItemQualificationChip
              icon={<MenuBookOutlinedIcon sx={{ color: 'white !important', height: 14 }} />}
              label={job.detailAdModel.education}
            />)}
          {job.detailAdModel.experience && (
            <JobsTableRowItemQualificationChip
              icon={<EngineeringIcon sx={{ color: 'white !important', height: 14 }} />}
              label={job.detailAdModel.experience}
            />)}
        </Box>
      </TableCell>
      <TableCell align='left'>
        <Typography style={{ fontSize: 14 }}>{job.detailOrderSummary.totalFees}</Typography>
      </TableCell>
      <TableCell align='left'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <BblButton
              label={active ? 'Başvuruları Görüntüle' : 'İş Özeti Görüntüle'}
              onClick={() => {
                if (active) {
                  nav(`/my-jobs/${job.detailAdModel.id}/appeals`)
                } {
                  nav(`/my-jobs/${job.detailAdModel.id}/summary`)
                }
              }}
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
            {active && (
              <>
                <IconButton
                  onClick={() => { nav(`/my-jobs/${job.detailAdModel.id}/edit`) }}
                  sx={{
                    p: 0,
                    m: 0,
                    marginLeft: 1,
                    marginRight: 1,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  <EditOutlined sx={{ p: 0.5 }} />
                </IconButton>
                <IconButton
                  onClick={() => { handleDeleteClick(job) }}
                  sx={{
                    p: 0,
                    display: { xs: 'none', sm: 'none', md: 'flex' },
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
              </>
            )}
          </Box>
          <IconButton
            onClick={() => { handleDeleteClick(job) }}
            sx={{
              p: 0,
              display: { xs: 'flex', sm: 'flex', md: 'none' },
              m: 0,
              mt: 1,
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
    </TableRow>
  )
}
