import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import headerPic from '../assets/cv-header-pic.png';
import CvInfo from './CvInfo';
import ImgIcon from './common/ImgIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function JobSummaryHeader() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesmd = useMediaQuery(theme.breakpoints.up('md'));
  const { image } = useContext(AuthContext);
  

  return (
    <Box position="relative">
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Box
          sx={{
            zIndex: 10,
            width: '100%',
          }}
        >
          <img style={{ width: '100%', height: 200, objectFit: 'cover' }} src={headerPic} alt={headerPic} />
        </Box>
        <Box
          sx={{
            position: 'relative',
            zIndex: 20,
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              mx: { xs: 1, sm: 2, md: 3, lg: 4, },
              mt: -6,
              zIndex: 20,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ImgIcon
                style={{ height: matches ? 123 : 60 }}
                src={image} alt={image}
              />
              <Box>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontSize: matches ? 27 : 16,
                    fontWeight: 700,
                  }}
                >
                  Adem <span style={{ color: theme.palette.primary.main }}>Şimşek</span>
                </Typography>
                <Typography fontWeight={700} fontSize={matches ? 16 : 10} sx={{ color: theme.palette.primary.dark }}>
                  İşletme Sahibi
                </Typography>
              </Box>
            </Box>
            {/* {matchesmd && <CvInfo />} */}
          </Paper>
          {/* {!matchesmd && <CvInfo />} */}
        </Box>
      </Box>
    </Box>
  )
}
