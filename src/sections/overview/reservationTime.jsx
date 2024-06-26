import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Avatar, Typography } from '@mui/material';

import CalendarTime from './calender'; 

const ReservationTime = () => (
  <div style={{ margin: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Avatar
        src='https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg'
        sx={{ width: 120, height: 120 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">آقای دکتر زمانی</Typography>
        <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
          متخصص مشاوره بورس و کارشناس تحلیل تکنیکال
        </Typography>
      </div>
    </div>
    <CalendarTime />
  </div>
);

export default ReservationTime;
