/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Button, Avatar, Divider, TextField, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const tableContainerStyle = {
  maxWidth: 900,
  margin: 'auto',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  marginTop: '20px',
  color:'#616161'
};

const lastRowStyle = {
  backgroundColor: '#e3f2fd',
};

function createData(name, content, isCodeValid = true) {
  return { name, content, isCodeValid };
}

const BasicTable = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(null);

  const handleCodeValidation = () => {
    if (discountCode.trim() === '') {
      setIsCodeValid(false);
    } else if (discountCode === 'validCode') {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  };

  const buttonStyle = {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    minWidth: 'auto',
    padding: '0',
    margin: '10px',
    backgroundColor: isCodeValid === null ? 'gray' : isCodeValid ? 'green' : 'red',
  };

  const headerText = {
    marginBottom: '40px',
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '20px',
  };

  const rows = [
    createData('هزینه', 800000),
    createData('تخفیف ویژه مشتریان', 800000),
    createData('ارزش افزوده', 100000),
    createData(
      'کد تخفیف',
      <>
        <TextField
          id="outlined"
          label="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          error={isCodeValid === false}
          helperText={isCodeValid === false ? 'کد تخفیف نامعتبر است' : ''}
        />
        <Button onClick={handleCodeValidation} variant="contained" style={buttonStyle}>
          <Iconify icon="gravity-ui:circle-check-fill" />
        </Button>
      </>,
      isCodeValid
    ),
    createData('مجموع', 0),
  ];

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Avatar
          src="https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg"
          sx={{ width: 120, height: 120 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">آقای دکتر زمانی</Typography>
          <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
            متخصص مشاوره بورس و کارشناس تحلیل تکنیکال
          </Typography>
          <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
            نوع مشاوره : حضوری
          </Typography>
          <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
            زمان مشاوره : 12/6/1403 12:30
          </Typography>
        </div>
      </div>

      <TableContainer component={Paper} style={tableContainerStyle}>
      <div style={headerText}>پیش فاکتور شما</div>
      <Divider/>

        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name} style={index === rows.length - 1 ? lastRowStyle : {}}>
                <TableCell component="th" scope="row">
                  <Typography variant="inherit" style={row.name === 'مجموع' ? { fontWeight: 'bold',color:'#424242',fontSize:'18px' } : {fontWeight: 'bold',color:'#757575' ,fontSize:'14px'}}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold',color:'#616161',fontSize:'16px'}}>{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
