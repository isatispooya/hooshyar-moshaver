/* eslint-disable no-unused-vars */
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
  const [open, setOpen] = useState(null); 
  const navigate = useNavigate();

  const handleClose = () => {
    setCookieValue('UID', null);
    console.log('hi');
    navigate('/login', { replace: true });
    setOpen(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(60deg,#2196f3, #1565c0)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              <Avatar variant="filled" radius="xl" size="lg" sx={{ backgroundColor: '#e3f2fd' }}>
                <AccountPopover />
              </Avatar>
            </Button>
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: '#e3f2fd' }}
            endIcon={<Iconify icon="gravity-ui:arrow-right-to-square" />}
          >
            خروج
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
