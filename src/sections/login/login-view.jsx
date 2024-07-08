/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
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

import { getCookieValue, setCookieValue } from 'src/utils/cookie';

// request 'http://192.168.62.106:8000'
import { Onrun } from 'src/api/onRun';
import { bgGradient } from 'src/theme/css';

export default function LoginView() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [captchaLogin, setCaptchaLogin] = useState('');
  const [codeNumber, setCodeNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordd, setPassword] = useState('');
  const [britDate, setBritDate] = useState('');
  const navigate = useNavigate();
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(true);
  const [captchaData, setCaptchaData] = useState(null);

  const [secondForm, setSecondForm] = useState(false);
  const [firstForm, setfirstForm] = useState(true);
  const [thirdForm, setThirdForm] = useState(false);

  // get captcha
  const fetchCaptcha = async () => {
    setIsLoadingCaptcha(true);
    try {
      const response = await axios.get(`${Onrun}/api/captcha/`);
      console.log('Captcha response:', response);
      setCaptchaData(response.data);
    } catch (error) {
      console.error('Error fetching captcha:', error);
      toast.error('خطا در ارسال کپچا');
    } finally {
      setIsLoadingCaptcha(false);
    }
  };
  // دریافت کد تائیئد
  const handleClick = async () => {
    try {
      const response = await axios.post(`${Onrun}/api/otp/consultant/`, {
        mobile: mobileNumber,
        captcha: captchaLogin,
        encrypted_response: captchaData.encrypted_response,
      });
      console.log('OTP response:', response);

      console.log('response.data.registered', response.data.registered);
      if (response.data.registered === false) {
        setThirdForm(true);
        setSecondForm(false);
      } else {
        setSecondForm(true);
        setThirdForm(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        toast.error('خطا در ارسال درخواست', error.message);
      }
      toast.error('خطا در ارسال درخواست', error.message);
    }
  };
  const loginClick = async () => {
    try {
      const sendApiCode = await axios.post(`${Onrun}/api/login/consultant/`, {
        mobile: mobileNumber,
        code: codeNumber,
      });

      setCookieValue('UID', sendApiCode.data.access);

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('خطا در ارسال درخواست', error.message);
    }
  };

  //  ساختن body ارسال فرم ثبت نام
  const signupClick = async () => {
    try {
      const response = await axios.post(`${Onrun}/api/signup/`, {
        mobile: mobileNumber,
        username: userName,
        name: firstName,
        last_name: lastName,
        national_code: nationalCode,
        email: emailAddress,
        password: passwordd,
        code: codeNumber,
        date_birth: britDate,
      });
      console.log('Signup response:', response);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('خطا در ثبت نام', error.message);
    }
  };

  const handelDate = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    setBritDate(formattedDate);
  };
  // چک کردن آیدی
  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  const editNumber = () => {
    setSecondForm(false);
    setThirdForm(false);
    setfirstForm(true);
  };

  useEffect(() => {
    checkUID();
  }, []);


  useEffect(() => {
    fetchCaptcha();
  }, []);

  const renderForm = (
    <>
      {firstForm && !secondForm && !thirdForm && (
        <>
          <Stack spacing={3}>
            <TextField
              name="mobile"
              label="شماره موبایل"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              style={{ marginBottom: '20px' }}
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
      {secondForm && !thirdForm && (
        <>
          <Stack spacing={3}>
            <TextField value={mobileNumber} disabled name="mobileNumber" />
            <TextField
              name="Code"
              label="کد تایید"
              onChange={(e) => setCodeNumber(e.target.value)}
            />
          </Stack>

          <div className='space-y-4' style={{ marginTop: '20px' }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              className='bg-[#1973cf]'
              onClick={loginClick}
            >
              ورود
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              className='bg-[#3a84cd]'
              onClick={editNumber}
            >
              ویرایش شماره
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
          {firstForm && !secondForm && !thirdForm && (
            <>
              <Typography variant="h3"> ورود</Typography>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ورود
                </Typography>
              </Divider>
            </>
          )}
          {secondForm && !thirdForm && (
            <>
              <Typography variant="h3"> تایید شماره تلفن</Typography>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  تایید شماره
                </Typography>
              </Divider>
            </>
          )}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
