/* eslint-disable no-undef */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-multi-date-picker';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip, Skeleton } from '@mui/material';

import { getCookieValue, setCookieValue } from 'src/utils/cookie';

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
  const [thirdForm, setThirdForm] = useState(false);

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

  const handleClick = async () => {
    try {
      const response = await axios.post(`${Onrun}/api/otp/`, {
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
      const sendApiCode = await axios.post(`${Onrun}/api/login/`, {
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

  const checkUID = () => {
    const uid= getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);


  useEffect(() => {
    fetchCaptcha();
  }, []);

  const renderForm = (
    <>
      {!secondForm && !thirdForm && (
        <>
          <Stack   spacing={3}>
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

          <div   style={{ textAlign: 'center', marginTop: '20px' }}>
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
      {thirdForm && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField value={mobileNumber} disabled name="mobileNumber" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="username"
                label="نام کاربری"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="نام"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="last_name"
                label="نام خانوادگی"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="تاریخ تولد">
                <div>
                  <DatePicker
                    style={{
                      height: '55px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      padding: '5px',
                      textAlign: 'center',
                      color: '#616161',
                      width: '100%',
                    }}
                    name="dateBirth"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-left"
                    placeholder="تاریخ تولد"
                    onChange={handelDate}
                  />
                </div>
              </Tooltip>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                label="ایمیل"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="national_code"
                label="کدملی"
                type="number"
                value={nationalCode}
                onChange={(e) => setNationalCode(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="password"
                label="رمز عبور"
                type="password"
                value={passwordd}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="Code"
                label="کد تایید"
                onChange={(e) => setCodeNumber(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: '20px' }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={signupClick}
            >
              ثبت‌نام
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
          {!secondForm && !thirdForm && (
            <>
              <Typography variant="h3" > ورود</Typography>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2"  sx={{ color: 'text.secondary' }}>
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
          {thirdForm && (
            <>
              <Typography variant="h3"> ثبت نام</Typography>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ثبت نام
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
