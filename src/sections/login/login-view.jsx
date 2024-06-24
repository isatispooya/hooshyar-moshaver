import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Button, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [captchaLogin, setCaptchaLogin] = useState('');
  const [SecondForm, setSecondForm] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setSecondForm(true);
  };

  const loginClick = async () => {
    console.log('loginClick');
    navigate('/', { replace: true });
  };

  const renderForm = (
    <>
      {!SecondForm && (
        <>
          <Stack spacing={3}>
            <TextField
              name="mobileNumber"
              label="شماره موبایل"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="captcha"
              label="کپچا"
              value={captchaLogin}
              onChange={(e) => setCaptchaLogin(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Stack>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant="rounded" width={210} height={60} />
          </Box>

          <Stack spacing={3} sx={{ mt: 2 }}>
            <Button onClick={() => console.log('capcha')}>
              <img alt="captcha" />
            </Button>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={{ borderRadius: '10px', py: 1.5 }}
            >
              تایید
            </LoadingButton>
          </Box>
        </>
      )}

      {SecondForm && (
        <>
          <Stack spacing={3}>
            <TextField value={mobileNumber} disabled name="mobileNumber" fullWidth variant="outlined" />
            <TextField name="Code" label="کد تایید" fullWidth variant="outlined" />
          </Stack>

          <Box sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={loginClick}
              sx={{ borderRadius: '10px', py: 1.5 }}
            >
              ورود
            </LoadingButton>
          </Box>
        </>
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 420,
          borderRadius: '12px',
          boxShadow: theme.shadows[10],
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          صفحه ورود
        </Typography>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ورود
          </Typography>
        </Divider>

        {renderForm}
      </Card>
    </Box>
  );
}
