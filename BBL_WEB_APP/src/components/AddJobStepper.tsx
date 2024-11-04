import { Box, Typography, useTheme } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { grey } from '@mui/material/colors';
import BblIcon from './common/BblIcon';

const VerticalStepper = styled(Stepper)(({ theme }) => ({
  [`& .${stepConnectorClasses.root}`]: {
    marginRight: theme.spacing(8),
  },
}));

const VerticalStep = styled(Step)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: 80,
  },
}));

const VerticalStepLabel = styled(StepLabel)(({ theme }) => ({
  textAlign: 'left',
  [`& .${stepConnectorClasses.alternativeLabel}`]: {
    marginTop: theme.spacing(4),
  },
}));

const VerticalQontoConnector = styled(StepConnector)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [`&.${stepConnectorClasses.line}`]: {
    minHeight: 80,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    borderLeftColor: grey[200],
  },
}));

const VerticalQontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: grey[500],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function VerticalQontoStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;
  const theme = useTheme();
  return (
    <VerticalQontoStepIconRoot ownerState={{ active }} className={className}>
      {active ? (
        <Box
          sx={{
            width: '65px !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: theme.palette.primary.main,
              border: `4px solid #DAEFF8`,
              borderRadius: '50%',
              width: '62px !important',
              height: '62px !important',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              color="white"
            >
              {icon}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '65px !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: grey[200],
              border: `4px solid #F6F8FF`,
              borderRadius: '50%',
              width: '42px !important',
              height: '42px !important',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                color: grey[500],
              }}
            >
              {icon}
            </Typography>
          </Box>
        </Box>
      )}
    </VerticalQontoStepIconRoot>
  );
}

// const steps = ['Paket Seçimi','İlk Detaylar', 'Nitelikler', 'İlan Özeti'];
const steps = ['İlk Detaylar', 'Nitelikler', 'İlan Özeti'];

type AddJobStepperProps = {
  activeStep: number,
}

export default function AddJobStepper({ activeStep }: AddJobStepperProps) {

  return (
    <Box>
      <Box>
        <Typography
          fontWeight={700}
          fontSize={14}
        >
          İlan Olustur
        </Typography>
        <Typography
          fontSize={12}
          color="text.secondary"
        >
          Yayınlanacak ilanın için detayları doldur.
        </Typography>
      </Box>
      <Box>
        <Stack direction="row" spacing={4}>
          <VerticalStepper
            activeStep={activeStep}
            connector={<VerticalQontoConnector />}
            orientation='vertical'
          >
            {steps.map((label) => (
              <VerticalStep key={label}>
                <VerticalStepLabel StepIconComponent={VerticalQontoStepIcon}>
                  {label}
                </VerticalStepLabel>
              </VerticalStep>
            ))}
          </VerticalStepper>
        </Stack>
      </Box>
    </Box>
  )
}
