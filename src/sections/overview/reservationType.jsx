/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';

import { styled } from '@mui/system';
import { Box, Grid, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

const StyledBox = styled(Box)(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '300px',
  height: '300px',
  margin: '20px',
  border: selected ? '2px solid #42a5f5' : '2px solid #ccc',
  borderRadius: '12px',
  cursor: 'pointer',
  backgroundColor: selected ? '#e3f2fd' : '#f9f9f9',
  transition: 'all 0.3s ease',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const TitleBox = styled(Box)({
  textAlign: 'center',
});

const ReservationType = () => {
  const [selected, setSelected] = useState('');

  const handleClick = (type) => {
    setSelected(type);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        <TitleBox>
          <Typography variant="h5" color="primary" style={{ color: '#000' }}>
            لطفاً نوع مشاوره خود را انتخاب کنید
          </Typography>
        </TitleBox>
      </Grid>
      <Grid item>
        <StyledBox
          style={{ marginTop: '-20rem' }}
          selected={selected === 'phone'}
          onClick={() => handleClick('phone')}
        >
          <IconButton>
            <Iconify icon="gravity-ui:headphones" width={60} height={60} />
          </IconButton>
          <Typography variant="h6" style={{ color: selected === 'phone' ? '#42a5f5' : '#000' }}>
            مشاوره تلفنی
          </Typography>
        </StyledBox>
      </Grid>
      <Grid item>
        <StyledBox
          style={{ marginTop: '-20rem' }}
          selected={selected === 'inPerson'}
          onClick={() => handleClick('inPerson')}
        >
          <IconButton>
            <Iconify icon="gravity-ui:person" width={60} height={60} />
          </IconButton>
          <Typography variant="h6" style={{ color: selected === 'inPerson' ? '#42a5f5' : '#000' }}>
            مشاوره حضوری
          </Typography>
        </StyledBox>
      </Grid>
    </Grid>
  );
};

export default ReservationType;
