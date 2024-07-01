/* eslint-disable react/prop-types */
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Rating } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

export default function ChoosingConsultant({ List }) {
  const [selectedConsultant, setSelectedConsultant] = React.useState(null);
  const [consultantData, setConsultantData] = useState([]);

  const handleSelectConsultant = (index) => {
    setSelectedConsultant(index);
  };

  const fetchConsultant = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/consultant/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultantData(response.data);
    } catch (error) {
      console.log('Error fetching type data:', error);
    }
  };

  console.log(consultantData);
  useEffect(() => {
    fetchConsultant();
  }, []);

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" align="center" mt="50px" mb="50px">
          لطفا مشاور خود را انتخاب کنید
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ maxWidth: 1200, margin: 'auto' }}>
        {consultantData.map((consultant, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: selectedConsultant === index ? '0px 0px 10px 3px #b7deb8' : 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <Avatar
                  sx={{ width: 160, height: 160 }}
                  src={consultant.profile_photo}
                  alt="Avatar Image"
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  {consultant.name} {consultant.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {consultant.postion}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Rating name="read-only" value={consultant.rank} readOnly />
                </Box>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: selectedConsultant === index ? '#00c853' : '#1976d2',
                  color: '#ffffff',

                  '&:hover': {
                    backgroundColor: selectedConsultant === index ? '#00e676' : '#1976d2',
                  },
                }}
                onClick={() => handleSelectConsultant(index)}
              >
                {selectedConsultant === index ? (
                  <Iconify fontWeight="800" width="25px" icon="gravity-ui:check" />
                ) : (
                  'انتخاب'
                )}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
