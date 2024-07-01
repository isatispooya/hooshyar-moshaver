import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Button, Typography } from '@mui/material';

import { setCookieValue } from 'src/utils/cookie';

import Iconify from 'src/components/iconify';

import AccountPopover from './common/account-popover';

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setCookieValue('UID', null);
    navigate('/login', { replace: true });
    setOpen(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(60deg,#2196f3, #1565c0)',
          position: 'fixed',
          zIndex: '1000',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              <Avatar sx={{ bgcolor: '#e3f2fd' }}>
                <AccountPopover />
              </Avatar>
            </Button>
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: '#e3f2fd',
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
                padding: '8px 12px',
                display: 'none',
              },
            }}
            endIcon={<Iconify icon="gravity-ui:arrow-right-to-square" />}
          >
            خروج
          </Button>
          <Button
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: '#e3f2fd',
              display: { xs: 'inline-flex', md: 'none' },
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
                padding: '8px 12px',
              },
            }}
          >
            <Iconify icon="eva:menu-outline" />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
