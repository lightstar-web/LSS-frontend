import React from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  DialogContent,
  Step,
  Stepper,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import BaseDialog from './BaseDialog';
import useResponsive from '../../hooks/useResponsive';

const STEPS = ['Application Submitted', 'Awaiting Review', 'Application Accepted'];

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.number,
  completed: PropTypes.bool,
  className: PropTypes.string,
};

ColorlibStepIconComplete.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.number,
  completed: PropTypes.bool,
  className: PropTypes.string,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#2E4B61',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#2E4B61',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    [theme.breakpoints.down('sm')]: {
      width: '0px',
    },
    [theme.breakpoints.down('md')]: {
      marginInline: '16px',
    },
    [theme.breakpoints.down('lg')]: {
      marginInline: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      marginInline: '48px',
    },
    backgroundColor: '#F1F5F9',
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  zIndex: 50,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <Box component="img" src="/assets/icons/steper/ic_check_step.svg" width={50} height={50} />,
    2: <Box component="img" src="/assets/icons/steper/ic_check_step.svg" width={50} height={50} />,
    3: <Box component="img" src="/assets/icons/steper/ic_check_step.svg" width={50} height={50} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

function ColorlibStepIconComplete(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <Box component="img" src="/assets/icons/steper/ic_check_step.svg" width={50} height={50} />,
    2: (
      <Box
        component="img"
        src="/assets/icons/steper/ic_active_second_step.svg"
        width={50}
        height={50}
      />
    ),
    3: (
      <Box
        component="img"
        src="/assets/icons/steper/ic_deactive_third_step.svg"
        width={50}
        height={50}
      />
    ),
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function ApplicationStepDialog({
  isOpenDialog,
  handleOpenDialog,
  handleOpenNextDialog,
}) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');

  const [activeStep, setActiveStep] = React.useState(2);

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleOpenNextDialog();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const autoTest = React.useCallback(async () => {
    if (!isOpenDialog) return;
    if (activeStep >= STEPS.length) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleNext();
  }, [isOpenDialog, activeStep]);

  React.useEffect(() => {
    autoTest();
  }, [autoTest]);

  React.useEffect(() => {
    if (activeStep === STEPS.length) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog && activeStep !== STEPS.length + 1}
      handleOpenDialog={handleOpenDialog}
      width="100%"
      height="fit-content"
      fullScreen
    >
      <DialogContent
        sx={{
          paddingX: { xl: '192px', lg: '80px', md: '80px', sm: '24px', xs: '8px' },
          paddingY: { xl: '24px', lg: '24px', md: '24px', sm: '8px' },
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Stepper
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ marginX: { lg: '96px' }, marginY: '24px' }}
          orientation={isMobile ? 'vertical' : 'horizontal'}
        >
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={
                  activeStep === STEPS.length - 1 ? ColorlibStepIconComplete : ColorlibStepIcon
                }
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '12px',
                    color: '#0F172A',
                    marginBottom: '4px',
                  }}
                >
                  Step 0{index + 1}
                </Typography>
                <Typography
                  sx={{ fontWeight: '600', fontSize: '16px', lineHeight: '16px', color: '#0F172A' }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
    </BaseDialog>
  );
}

ApplicationStepDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleOpenNextDialog: PropTypes.func.isRequired,
};
