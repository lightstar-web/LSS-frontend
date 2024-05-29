import React from 'react';
import PropTypes from 'prop-types';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { Box, DialogContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import { CustomLoginTextField } from '../text-field';
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
// hook
import FormProvider from '../hook-form';

export const defaultValues = {
  password: '',
  confirmPassword: '',
};

const FormSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match"),
});

export default function ConfirmPasswordDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    // watch,
    reset,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('DATA', values);
    reset();
    handleOpenDialog();
    router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.CONFIRM));
  };

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px" justifyContent="center" alignContent="center">
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CustomLoginTextField
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                imgSrc="/assets/icons/auth/ic_lock.svg"
              />
              <CustomLoginTextField
                fullWidth
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                imgSrc="/assets/icons/auth/ic_lock.svg"
              />
              <LoginButton loading={isSubmitting} type="submit">
                Confirm password.
              </LoginButton>
            </Box>
          </FormProvider>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

ConfirmPasswordDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
