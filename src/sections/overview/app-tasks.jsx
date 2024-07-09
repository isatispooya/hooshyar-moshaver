/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import axios from 'axios';
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Chip, Avatar, Divider, CardHeader } from '@mui/material';

import { getCookieValue } from 'src/utils/cookie';

// request 'http://192.168.62.106:8000'
import { Onrun } from 'src/api/onRun';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, ...other }) {
  const [selected, setSelected] = useState(['2']); // حالت برای نگهداری آیتم‌های انتخاب شده
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // حالت برای باز یا بسته بودن مودال تایید حذف
  const [viewModalOpen, setViewModalOpen] = useState(false); // حالت برای باز یا بسته بودن مودال مشاهده
  const [selectedTask, setSelectedTask] = useState(null); // حالت برای نگهداری تسک انتخاب شده
  const [list, setList] = useState([]); // حالت برای نگهداری لیست تسک‌ها

  // تابع برای گرفتن لیست مشتریان
  const fetchConsultant = async () => {
    const token = getCookieValue('UID'); // گرفتن توکن از کوکی

    try {
      const response = await axios.get(`${Onrun}/api/visit/consultations/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data); // ذخیره داده‌ها در حالت لیست
    } catch (error) {
      console.log('Error fetching consultant data:', error); // نمایش خطا در صورت عدم موفقیت
    }
  };

  useEffect(() => {
    fetchConsultant(); // فراخوانی تابع fetchConsultant در زمان لود کامپوننت
  }, []);

  const navigate = useNavigate(); // استفاده از هوک useNavigate برای مسیریابی

  // تابع برای مدیریت کلیک تکمیل تسک
  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted); // به روز رسانی حالت selected
  };

  // تابع برای مدیریت حذف تسک
  const handleDelete = (taskId) => {
    setSelectedTask(taskId); // تنظیم تسک انتخاب شده
    setConfirmDeleteOpen(true); // باز کردن مودال تایید حذف
  };

  // تابع برای تایید حذف تسک
  const handleConfirmDelete = () => {
    console.info('DELETE', selectedTask); // نمایش پیام در کنسول
    setConfirmDeleteOpen(false); // بستن مودال تایید حذف
  };

  // تابع برای مشاهده جزئیات تسک
  const handleView = (taskId) => {
    setSelectedTask(taskId); // تنظیم تسک انتخاب شده
    setViewModalOpen(true); // باز کردن مودال مشاهده
  };

  // تابع برای مسیریابی به صفحه رزرو مشاور
  const handleConsultant = () => {
    navigate('/ConsultantReservation', { replace: true });
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
      dir="rtl" // تنظیم جهت به راست
    >
      <div className='flex justify-between mb-8 md:m-4'>
        <CardHeader
          sx={{
            mb: 3,
            textAlign: 'center',
            fontSize: '1rem',
          }}
          title='برنامه کاری شما' // عنوان برنامه کاری شما
        />
        <Box className='mt-4' >
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/date')} // مسیریابی به صفحه تقویم
          >
            <Iconify className="ml-2 " icon="material-symbols:checkbook-outline-rounded" width="1.2rem" height="1.2rem" />
            برنامه کاری
          </Button>
        </Box>
      </div>
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#64b5f6' }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                نام مشتری
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                نوع
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                وضعیت
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                تاریخ
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#555555',
                }}
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  اطلاعاتی موجود نمیباشد {' '}
                </TableCell>
              </TableRow>
            ) : (
              list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  list={list}
                  checked={selected.includes(task.id)}
                  onClickComplete={() => handleClickComplete(task.id)}
                  onDelete={() => handleDelete(task.id)}
                  onView={() => handleView(task.id)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        task={list.find((item) => item.id === selectedTask)}
      />

     
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
// ----------------------------------------------------------------------

// کامپوننت TaskItem برای نمایش یک ردیف از تسک‌ها
function TaskItem({ task, list, onView }) {
  const isComplating = list.status === 'complating';
  console.log(list, list);
  console.log(task, task);

  const [openMenu, setOpenMenu] = useState(null); // حالت برای باز یا بسته بودن منوی پاپ‌اور

  // تابع برای باز کردن منوی پاپ‌اور
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  // تابع برای بستن منوی پاپ‌اور
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  return (
    <TableRow
      sx={{
        border: '2px solid #e0e0e0',
        '&:hover': { backgroundColor: '#f5f5f5' },
      }}
    >
      <React.Fragment key={task.id}>
        <TableCell>{task.consultant}</TableCell>
        <TableCell>{task.kind}</TableCell>
        <TableCell style={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
          {task.status ? (
            <Iconify icon="mdi:perimeter" style={{ color: 'green' }} />
          ) : (
            <Iconify icon="gravity-ui:circle-check" style={{ color: 'blue' }} />
          )}
        </TableCell>
        <TableCell>{task.date}</TableCell>
      </React.Fragment>


      <TableCell>
        <IconButton color={openMenu ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        <Popover
          open={!!openMenu}
          anchorEl={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => onView(list.id)}>
            <Iconify icon="gravity-ui:chevrons-expand-up-right" sx={{ mr: 2 }} />
            مشاهده
          </MenuItem>
         
        </Popover>
      </TableCell>
    </TableRow>
  );
}

function DeleteConfirmationModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: '#F8F9FA',
          boxShadow: 24,
          p: 5,
          borderRadius: 2,
          border: '8px double #495057',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 5, color: '#495057' }}>
          از لغو مشاوره خود اطمینان دارید؟
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{ mr: 2, bgcolor: '#E03131', color: '#FFFFFF' }}
          >
            بله
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ bgcolor: '#66A80F', color: '#FFFFFF' }}
          >
            خیر
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

function ViewModal({ open, onClose, task }) {
  const [starValue, setStarValue] = useState([]);

  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxWidth: '90%',
          backgroundColor: '#FFFFFF',
          boxShadow: 24,
          borderRadius: 4,
          textAlign: 'center',
          p: 4,
          border: '2px solid #E0E0E0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: '#42a5f5',
            fontWeight: 'bold',
            backgroundColor: '#e3f2fd',
            py: 1,
            borderRadius: 2,
          }}
        >
          جزئیات مشاوره
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Avatar
            src={`${Onrun}/${task.consultant_photo}`}
            alt="مشاور"
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            {task.consultant}{' '}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          نوع مشاوره: {task.kind}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          تاریخ  {task.date}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
           ساعت مشاوره: {task.time}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip
              icon={task.status === 'done' ? <Iconify icon="gravity-ui:circle-check-fill" /> : <Iconify icon="mdi:perimeter" />}
              label={task.status === 'done' ? 'تکمیل شد' : 'درحال اجرا'}
              color={task.status === 'done' ? "info" : "success"}
              sx={{ fontSize: '14px', bgcolor: '#D7ECD9', color: '#4CAF50' }}
            />
        </Box>
        {task.status === 'completing' && (
          <Box>
            <Divider sx={{ mb: 2, mt: 2 }} />
              <Button
                variant="contained"
                onClick={onClose}
                sx={{ bgcolor: '#1976D2', color: '#FFFFFF', px: 4 }}
              >
                بستن
              </Button>
  
          </Box>
        )}
      </Box>
    </Modal>
  );
}
