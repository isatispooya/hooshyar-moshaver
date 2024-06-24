/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmTaskId, setConfirmTaskId] = useState(null);

  const navigate = useNavigate();

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const handleDelete = (taskId) => {
    setConfirmTaskId(taskId);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    console.info('DELETE', confirmTaskId);
    setConfirmationOpen(false);
  };

  const handelConsultant = () => {
    navigate('/ConsultantReservation', { replace: true });
  };

  return (
    <Card {...other} dir="rtl" sx={{ p: 2 }}>
      <CardHeader align="center" title="مشاوره های شما" />
      <Box sx={{ direction: 'rtl' }}>
        <Button variant="contained" disableElevation onClick={handelConsultant}>
          دریافت مشاوره جدید
          <Iconify icon="gravity-ui:plus" />
        </Button>
      </Box>
      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onClickComplete={() => handleClickComplete(task.id)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}

      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
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

function TaskItem({ task, checked, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          m: 1,
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: checked ? 'grey.100' : 'background.paper',
          '&:hover': {
            boxShadow: 3,
          },
          transition: 'box-shadow 0.3s ease-in-out',
          position: 'relative',
          borderLeft: '4px solid green',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box >
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'text.disabled' : 'text.primary',
              }}
            >
            نام مشاور:

              {task.name}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'text.disabled' : 'text.primary',
              }}
            >
            نوع مشاوره: 

              {task.type}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'text.disabled' : 'text.primary',
              }}
            >
            وضعیت:

              {task.status}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                textDecoration: checked ? 'line-through' : 'none',
                color: checked ? 'text.disabled' : 'text.primary',
              }}
            >
            تاریخ:
            
              {task.date}
            </Typography>
          </Box>

          <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Box>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit}>
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
    </>
  );
}

function ConfirmationModal({ open, onClose, onConfirm }) {
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
