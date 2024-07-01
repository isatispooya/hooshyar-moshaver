import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, Typography, IconButton, styled } from '@mui/material';
import { getCookieValue } from 'src/utils/cookie';
import { Onrun } from 'src/api/onRun';
import Iconify from 'src/components/iconify';

const StyledBox = styled(Grid)(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  margin: '20px',
  border: selected ? '2px solid #42a5f5' : '2px solid #ccc',
  borderRadius: '12px',
  cursor: 'pointer',
  backgroundColor: selected ? '#e3f2fd' : '#ffffff',
  transition: 'all 0.3s ease',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const TitleBox = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '10vh',
  padding: '20px',
});

const ReservationType = () => {
  const [selected, setSelected] = useState('');
  const [typeData, setTypeData] = useState([]);

  const handleClick = (type) => {
    setSelected(type);
  };

  const fetchType = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/kindofcounseling/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypeData(response.data);
    } catch (error) {
      console.log('Error fetching type data:', error);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: '70vh',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: '20px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        marginTop:'50px',
        width:'50vw'
      }}
    >
      <Grid item xs={12}>
        <TitleBox>
          <Typography variant="h5" color="primary">
            لطفاً نوع مشاوره خود را انتخاب کنید
          </Typography>
        </TitleBox>
      </Grid>
      {typeData.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <StyledBox selected={selected === item.title} onClick={() => handleClick(item.title)}>
            <IconButton>
              {item.icon ? (
                <Iconify icon={item.icon} width={80} height={80} />
              ) : (
                <Iconify icon="gravity-ui:person" width={80} height={80} />
              )}
            </IconButton>
            <Typography
              variant="h6"
              style={{ color: selected === item.title ? '#42a5f5' : '#000' }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="h6"
              style={{ color: selected === item.title ? '#42a5f5' : '#000' }}
            >
              {item.price}
            </Typography>
          </StyledBox>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReservationType;