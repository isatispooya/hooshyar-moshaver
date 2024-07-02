/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import axios from 'axios';
import PropTypes from 'prop-types';
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Button, Avatar, Divider, TextField, Typography } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

const tableContainerStyle = {
  maxWidth: 900,
  margin: 'auto',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  marginTop: '20px',
  color: '#616161',
};

const lastRowStyle = {
  backgroundColor: '#e3f2fd',
};

function createData(name, content, isCodeValid = true) {
  return { name, content, isCodeValid };
}

const BasicTable = ({ typeDataId, consultantData }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(null);
  const [invoice, setInvoice] = useState();

  const fetchTime = async () => {
    const token = getCookieValue('UID');

    try {
      const response = await axios.get(`${Onrun}/api/perpay/${typeDataId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvoice(response.data);
    } catch (error) {
      console.log('Error fetching time:', error);
    }
  };

  useEffect(() => {
    fetchTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUID = () => {
    const uid = getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

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
    backgroundColor: isCodeValid === null ? 'blue' : isCodeValid ? 'green' : 'red',
  };

  const headerText = {
    marginBottom: '40px',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
  };

  const rows = [
    createData('هزینه', invoice ? invoice.price : '--'),
    createData('تخفیف ویژه مشتریان', invoice ? invoice.off : '--'),
    createData('ارزش افزوده', invoice ? invoice.tax : '--'),
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
    createData('مجموع', invoice ? invoice.pey : '--'),
  ];

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Avatar src={consultantData.avatar} sx={{ width: 120, height: 120 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">{consultantData.name}</Typography>
          <Typography variant="body2" style={{ fontSize: '14px', color: '#666' }}>
            {consultantData.specialty}
          </Typography>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <TableContainer component={Paper} style={tableContainerStyle}>
          <div className="text-xl font-bold text-[#212b36]" style={headerText}>
            اطلاعات پرداخت
          </div>
          <Divider />

          <Table aria-label="simple table" style={{}}>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name} style={index === rows.length - 1 ? lastRowStyle : {}}>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="inherit"
                      style={
                        row.name === 'مجموع'
                          ? { fontWeight: 'bold', color: '#212b36', fontSize: '18px' }
                          : { fontWeight: 'bold', color: '#202b36', fontSize: '14px' }
                      }
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 'bold', color: '#616161', fontSize: '16px' }}
                  >
                    {row.content}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

BasicTable.propTypes = {
  typeDataId: PropTypes.string.isRequired,
  consultantData: PropTypes.array.isRequired,
};

export default BasicTable;
