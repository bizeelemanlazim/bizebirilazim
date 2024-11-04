import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import IdIcon from '@mui/icons-material/LocalOfferOutlined';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Card, Typography, useTheme } from '@mui/material';
import companyLogo from '../assets/company-logo.png';
import { DetailAds } from '../utils/types';
import { formatTime } from '../utils/utils';
import JobsTableRowItemQualificationChip from './JobsTableRowItemQualificationChip';
import BblButton from './common/BblButton';
import ImgIcon from './common/ImgIcon';

type JobCardItemProps = {
  job: DetailAds;
  handleApply: (job: DetailAds) => void;
  applySending: boolean;
  isApplied?: boolean;
  onClick?: () => void;
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function JobCardItem({ job, handleApply, applySending, isApplied, onClick }: JobCardItemProps) {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        pb: 2,
        cursor: 'pointer'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ImgIcon style={{ height: 40 }} src={companyLogo} alt='Company Logo' />
          <Box>
            <Typography fontSize={14} fontWeight={700}>
              {job.detailOrderSummary.jobName}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
            <DateRangeOutlinedIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>
              {formatDate(job.detailAdModel.workStartDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
            <IdIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 12 }}>
              #{job.detailAdModel.jobId}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mx: 2 }}>
        <JobsTableRowItemQualificationChip icon={<LocationIcon sx={{ fontSize: 12 }} />} label={"Ankara"} />
        <JobsTableRowItemQualificationChip icon={<AccessTimeIcon sx={{ fontSize: 12 }} />} label={formatTime(job.detailAdModel.workingTime)} />
      </Box>
      <Box sx={{ mx: 2, mt: 1 }}>
        <Typography fontSize={14}>
          {job.detailAdModel.attribute}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <BblButton
            loading={applySending}
            sx={{
              mt: 3,
              background: !isApplied ? theme.palette.primary.main : 'green',
            }}
            label={isApplied ? 'Başvuruldu' : 'Başvur'}
            variant='contained'
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              !isApplied && handleApply(job)
            }}
          />
        </Box>
      </Box>

    </Card>
  );
}




// import { Box, Card, Typography, useMediaQuery, useTheme } from '@mui/material'
// import React from 'react'
// import ImgIcon from './common/ImgIcon'
// import companyLogo from '../assets/company-logo.png'
// import JobsTableRowItemQualificationChip from './JobsTableRowItemQualificationChip'
// import { LocationCity } from '@mui/icons-material'
// import LocationIcon from '@mui/icons-material/LocationOnOutlined';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
// import IdIcon from '@mui/icons-material/LocalOfferOutlined';
// import BblButton from './common/BblButton'
// import { DetailAds } from '../utils/types'

// type JobCardItemProps = {
//   job: DetailAds
// }

// export default function JobCardItem({ job }: JobCardItemProps) {
//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints.up('xs'));
//   return (
//     <Card
//       sx={{
//         pb: 2
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           p: 2
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center'
//           }}
//         >
//           <ImgIcon
//             style={{
//               height: 40
//             }}
//             src={companyLogo}
//             alt={companyLogo} />
//           <Box>
//             <Typography fontSize={14} fontWeight={700}>
//               Human Resource
//             </Typography>
//             <Typography fontSize={12}>
//               Wayne Enterprises
//             </Typography>
//           </Box>
//         </Box>
//         <Box>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'end'
//             }}
//           >
//             <DateRangeOutlinedIcon sx={{ fontSize: 14 }} />
//             <Typography
//               sx={{
//                 fontSize: 12
//               }}
//             >
//               1 Aralık 2022
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//               justifyContent: 'end',
//               alignItems: 'center',
//             }}
//           >
//             <IdIcon sx={{ fontSize: 14 }} />
//             <Typography
//               sx={{
//                 fontSize: 12
//               }}
//             >
//               #6A4G1HJ
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 1,
//           mx: 2,
//         }}
//       >
//         <JobsTableRowItemQualificationChip
//           icon={<LocationIcon sx={{ fontSize: 12 }} />}
//           label="Ankara"
//         />
//         <JobsTableRowItemQualificationChip
//           icon={<AccessTimeIcon sx={{ fontSize: 12 }} />}
//           label="Full-Time"
//         />
//       </Box>
//       <Box
//         sx={{
//           mx: 2,
//           mt: 1
//         }}
//       >
//         <Typography
//           fontSize={14}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lacus non orci euismod vestibulum vitae ut ex. Quisque ut arcu at lectus tristique auctor sit amet at turpis.
//         </Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'flex-end'
//           }}
//         >
//           <BblButton
//             sx={{ mt: 3 }}
//             label='Başvur'
//             variant='contained'
//             size='small'
//             onClick={() => { }}
//           />
//         </Box>
//       </Box>
//     </Card>
//   )
// }
