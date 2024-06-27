import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Button, Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { Onrun } from 'src/api/onRun';
import { bgGradient } from 'src/theme/css';

export default function LoginView() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [captchaLogin, setCaptchaLogin] = useState('');
  const [codeNumber, setCodeNumber] = useState('');
  const navigate = useNavigate();
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(true);
  const [captchaData, setCaptchaData] = useState(null);
  const [codeData, setcodeData] = useState(null);

  const [secondForm, setSecondForm] = useState(false);

  const fetchCaptcha = async () => {
    setIsLoadingCaptcha(true);
    try {
      const response = await axios.get(`${Onrun}/api/captcha/`);
      setCaptchaData(response.data);
    } catch (error) {
      console.error('Error fetching captcha:', error);
      toast.error('Failed to load captcha');
    } finally {
      setIsLoadingCaptcha(false);
    }
  };

  const handleClick = async() => {
    try {
      const response = await axios.post(`${Onrun}/api/otp/`);
      console.log(response);
    } catch (error) {
      console.error('Error fetching captcha:', error);
    } finally {
      setIsLoadingCaptcha(false);
    }
  };

  const loginClick = () => {
    console.log('loginClick');
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const renderForm = (
    <>
      {!secondForm && (
        <>
          <Stack spacing={3}>
            <TextField
              name="mobileNumber"
              label="شماره موبایل"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
            style={{marginBottom:'20px'}}
              name="captcha"
              label="کپچا"
              value={captchaLogin}
              onChange={(e) => setCaptchaLogin(e.target.value)}
            />
          </Stack>

          {isLoadingCaptcha ? (
            <Skeleton variant="rounded" width={330} height={60} />
          ) : (
            <Stack spacing={3}>
              <Button onClick={fetchCaptcha}>
                <img src={`data:image/png;base64,${captchaData?.image}`} alt="captcha" />
              </Button>
            </Stack>
          )}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              تایید
            </LoadingButton>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </>
      )}
      {secondForm && (
        <>
          <Stack spacing={3}>
            <TextField value={mobileNumber} disabled name="mobileNumber" />
            <TextField name="Code" label="کد تایید" onChange={(e) => setCodeNumber(e.target.value)} />
          </Stack>

          <div style={{ marginTop: '20px' }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={loginClick}
            >
              ورود
            </LoadingButton>
          </div>
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
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">صفحه ورود</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ورود
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
