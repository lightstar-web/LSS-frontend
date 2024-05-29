import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
// components
import Image from '../image';

// ----------------------------------------------------------------------

BlockedUserList.propTypes = {
  row: PropTypes.object,
};

export default function BlockedUserList({ row }) {
  const { userAvatar, userName } = row;
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          alt="product image"
          src={userAvatar}
          sx={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            mr: 2,
          }}
        />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 },
            flex: 1,
          }}
        >
          <Typography
            noWrap
            variant="subtitle1"
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              maxWidth: { xs: 200, sm: 200, md: 220, lg: 260, xl: 260 },
            }}
          >
            {userName}
          </Typography>

          <Typography
            sx={{
              fontWeight: '500',
              fontSize: '12px',
              color: theme.palette.primary.contrastText,
            }}
          >
            {row.products > 200 ? '200+' : row.products} Products
          </Typography>
        </Stack>
      </Box>

      <Stack
        gap={3}
        alignItems="end"
        justifyContent="center"
        sx={{
          width: '100%',
          display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
        }}
      >
        <LoadingButton
          variant="outlined"
          sx={{
            border: '1px solid #000000',
            paddingY: '14px',
            paddingX: '20px',
            borderRadius: '50px',
          }}
        >
          <Typography
            sx={{ fontWeight: '500', fontSize: '14px', color: theme.palette.primary.contrastText }}
          >
            Unblock
          </Typography>
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
