import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useContext, useEffect } from 'react';
import headerPic from '../assets/cv-header-pic.png';
import { AuthContext } from '../contexts/AuthContext';
import { getCV } from '../services/ProfileSettingsServices';
import { AppealType, CWType } from '../utils/types';
import CvInfo from './CvInfo';
import ExperienceItem from './ExperienceItem';
import SkillItem from './SkillItem';
import BblButton from './common/BblButton';
import ImgIcon from './common/ImgIcon';

type EmployeeCVDialogProps = {
  open: boolean;
  onClose: () => void;
  appeal?: AppealType;
  handleAccept: (appeal: AppealType) => void;
  sendingAccept?: boolean;
}

export default function EmployeeCVDialog({ open, onClose, handleAccept, appeal, sendingAccept }: EmployeeCVDialogProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [cwInfo, setCwInfo] = React.useState<CWType>();
  const [loading, setLoading] = React.useState(false);
  const { token } = useContext(AuthContext);

  const fetchCwInfo = async () => {
    setLoading(true);
    try {
      const res = await getCV(appeal?.id!, token);
      if (res.isSuccess) {
        setCwInfo(res.data);
      } else {
        enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Bir hata oluştu.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      fetchCwInfo();
    }
  }, [open])

  const getDateText = (workInfo: any) => {
    if (workInfo.isWorking) {
      return `${workInfo.startDate} --- Devam Ediyor`
    } else {
      return `${workInfo.startDate} --- ${workInfo.endDate}`
    }
  }

  const cwComponents = [
    (
      cwInfo?.workExperiences.length && cwInfo?.workExperiences.length > 0 ? (
        <Box
          mt={2}
        >
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 700,
              color: theme.palette.primary.main
            }}
          >
            Deneyimler
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4
            }}
          >
            {
              cwInfo?.workExperiences.map((item, index) => (
                <>
                  <ExperienceItem
                    key={index}
                    title={item.workingCompany}
                    subtitle={item.workingCompany}
                    date={getDateText(item)}
                    description={item.description}
                  />
                </>
              ))
            }
          </Box>
        </Box>
      ) : undefined
    ),
    (
      cwInfo?.educationInformations.length && cwInfo?.educationInformations.length > 0 ? (
        <Box
          mt={2}
        >
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 700,
              color: theme.palette.primary.main
            }}
          >
            Eğitimler
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4
            }}
          >
            {
              cwInfo?.educationInformations.map((item, index) => (
                <>
                  <ExperienceItem
                    key={index}
                    title={item.section}
                    subtitle={item.school}
                    date={getDateText(item)}
                    description={item.description}
                  />
                </>
              ))
            }
          </Box>
        </Box>
      ) : undefined
    ),
    (
      cwInfo?.abilityInformations.length && cwInfo?.abilityInformations.length > 0 ? (
        <Box
          mt={2}
        >
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 700,
              color: theme.palette.primary.main
            }}
          >
            Beceriler
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4
            }}
          >
            {
              cwInfo?.abilityInformations.map((item, index) => (
                <>
                  <SkillItem
                    key={index}
                    title={item.abilityName}
                    rate={item.degree}
                    description={item.description}
                  />
                </>
              ))
            }
          </Box>
        </Box>
      ) : undefined
    ),
    (
      cwInfo?.certificateInformations.length && cwInfo?.certificateInformations.length > 0 ? (
        <Box
          mt={2}
        >
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 700,
              color: theme.palette.primary.main
            }}
          >
            Nitelikler
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4
            }}
          >
            {
              cwInfo?.certificateInformations.map((item, index) => (
                <>
                  <ExperienceItem
                    key={index}
                    title={item.certificateName}
                    subtitle={item.certificationInstitution}
                    date={item.startDate}
                    description={item.description}
                  />
                </>
              ))
            }
          </Box>
        </Box>
      ) : undefined
    ),
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullScreen={!matches}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Typography>
            Aday Özgeçmişi
          </Typography>
          <BblButton
            sx={{
              position: 'absolute',
              right: 0,
            }}
            onClick={onClose}
            iconButton
            icon={<Close />}
          />
        </Box>
      </DialogTitle>
      {cwInfo ? (
        <DialogContent>
          <Box position="relative">
            <Box
              sx={{
                width: '100%'
              }}
            >
              <Box
                sx={{
                  zIndex: 10,
                  width: '100%'
                }}
              >
                <img style={{ zIndex: 10, width: '100%' }} src={headerPic} alt={headerPic} />
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
                    mx: 4,
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
                      src={appeal?.image}
                      alt={appeal?.image}
                      style={{
                        height: matches ? 123 : 60,
                        width: matches ? 123 : 60,
                        borderRadius: '50%',
                      }}
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
                        {cwInfo?.personal.firstName} <span style={{ color: theme.palette.primary.main }}>{cwInfo?.personal.lastName}</span>
                      </Typography>
                      {/* <Typography fontWeight={700} fontSize={matches ? 16 : 10} sx={{ color: theme.palette.primary.dark }}>
                      İşletme Sahibi
                    </Typography> */}
                    </Box>
                  </Box>
                  <Rating
                    size={matches ? 'large' : 'small'}
                    name="simple-controlled"
                    value={cwInfo?.personal.rate}
                    readOnly
                  />
                </Paper>
                <CvInfo
                  cwInfo={cwInfo?.personal}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
            }}
          >
            {cwComponents.map((item, index) => (
              <>
                {item}
                {index !== cwComponents.length - 1 && (
                  <Divider />
                )}
              </>
            ))}
          </Box>
        </DialogContent>
      ) : (
        <Box>
        </Box>
      )}
      <DialogActions>
        <BblButton
          label={appeal?.isApply ? 'İşi Bitir' : 'İşe Al'}
          loading={sendingAccept}
          variant='contained'
          onClick={() => handleAccept(appeal!)}
          sx={{
            width: 150
          }}
        />
      </DialogActions>
    </Dialog >
  )
}

