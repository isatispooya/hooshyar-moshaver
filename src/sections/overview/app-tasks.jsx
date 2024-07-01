/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Chip, Avatar, Divider, TextField, CardHeader } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const handleDelete = (taskId) => {
    setSelectedTask(taskId);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.info('DELETE', selectedTask);
    setConfirmDeleteOpen(false);
  };

  const handleView = (taskId) => {
    setSelectedTask(taskId);
    setViewModalOpen(true);
  };

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
      dir="rtl"
    >
      <CardHeader
        sx={{
          mb: 3,
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
        title="مشاوره های شما"
      />
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto', }}>
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
                نام مشاور
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

          <TableBody style={{borderRight:'5px solid green'}}>
            {list.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                checked={selected.includes(task.id)}
                onClickComplete={() => handleClickComplete(task.id)}
                onDelete={() => handleDelete(task.id)}
                onView={() => handleView(task.id)}
              />
            ))}
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
        taskId={selectedTask}
        tasks={list}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          disableElevation
          onClick={handleConsultant}
          sx={{
            backgroundColor: '#1976d2',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 'px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#42a5f5' },
          }}
        >
          <Iconify icon="gravity-ui:plus" sx={{ mr: 1 }} /> دریافت مشاوره
        </Button>
      </Box>
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onDelete, onView }) {
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

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
        border:'2px solid #e0e0e0',
        '&:hover': { backgroundColor: '#f5f5f5' },
      }}
    >
      <TableCell>{task.name}</TableCell>
      <TableCell>{task.type}</TableCell>
      <TableCell style={{ color: 'green' ,display:'flex',marginRight:'20px'}}>
      <Iconify icon="gravity-ui:circle-check"/>      </TableCell>
      <TableCell>{task.date}</TableCell>
      <TableCell>
        
          <IconButton color={openMenu ? 'inherit' : 'default'} onClick={handleOpenMenu}>
            <Iconify  icon="eva:more-vertical-fill" />
          </IconButton>

        <Popover
          open={!!openMenu}
          anchorEl={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={onView}>
            <Iconify icon="gravity-ui:chevrons-expand-up-right" sx={{ mr: 2 }} />
            مشاهده
          </MenuItem>
          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" sx={{ mr: 2 }} />
            اشتراک گذاری
          </MenuItem>
          <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            لغو
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

function ViewModal({ open, onClose, taskId, tasks }) {
  const task = tasks.find((item) => item.id === taskId);
  const [starValue, setStarValue] = useState([]);
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
            src="https://media.khabaronline.ir/d/2020/10/28/3/5482312.jpg"
            alt="مشاور"
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            اقای دکتر محمد زمانی
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          نوع مشاوره: {task ? task.type : ''}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          تاریخ و ساعت مشاوره: 12/6/1403 12:30
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Chip
            icon={<Iconify icon="gravity-ui:circle-check-fill" />}
            label="تکمیل شده"
            color="success"
            sx={{ fontSize: '14px', bgcolor: '#D7ECD9', color: '#4CAF50' }}
          />
        </Box>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          لطفاً به اقای دکتر محمد زمانی امتیاز دهید:
        </Typography>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(newValue) => {
            setStarValue(newValue);
          }}
          size="large"
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="نظر"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ bgcolor: '#1976D2', color: '#FFFFFF', px: 4 }}
          >
            بستن
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
