/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';
import { account } from 'src/_mock/account';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const fetchProfile = async () => {
    try {
      const token = getCookieValue('UID');
      console.log(token);

      const response = await axios.get(`${Onrun}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('token', token);

      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching Profile:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
          handleprofile();
        } else if (error.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(error.response.data.message || error.message || 'An unexpected error occurred');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
    }
  };

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log('Current UID:', uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleprofile = () => {
    navigate('/', { replace: true });
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 40,
            height: 40,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleprofile}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 300,
            boxShadow: 3,
            borderRadius: 1,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ my: 2, px: 2, direction: 'ltr' }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold', mb: 0.5 }}>
            نام و نام خانوادگی:
            {profile.name || 'نام نامشخص'} {profile.last_name || 'نام خانوادگی نامشخص'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }} noWrap>
            شماره تلفن:
            {profile.mobile || 'شماره تلفن نامشخص'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }} noWrap>
            ایمیل:
            {profile.email || 'ایمیل نامشخص'}
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: 'error.main', mb: 0.5 }} noWrap>
              {error}
              <CircularProgress />
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
}
