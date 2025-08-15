import React, { useState } from 'react';
import { 
  TableCell, 
  TableRow, 
  Button, 
  Typography,
  Chip
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import CourseForm from './CourseForm';

const Course = ({ course, index, theme }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleRegisterClick = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <>
      <TableRow 
        sx={{
          backgroundColor: index % 2 === 0 
            ? theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.02)' 
              : 'rgba(255, 255, 255, 0.05)'
            : theme.palette.mode === 'light'
              ? 'white'
              : 'rgba(255, 255, 255, 0.02)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          },
          '&:last-child td': {
            borderBottom: 'none'
          }
        }}
      >
        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {course.name}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Chip 
            label={course.category}
            size="small"
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              backgroundColor: 'rgba(103, 126, 234, 0.1)',
              color: 'primary.main',
              fontWeight: 500
            }}
          />
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {course.participantsCount}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              color: 'text.secondary'
            }}
          >
            {course.executingEntity}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              color: 'text.primary',
              fontWeight: 500
            }}
          >
            {formatDate(course.startDate)}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              color: 'text.primary',
              fontWeight: 500
            }}
          >
            {formatDate(course.endDate)}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              color: 'secondary.main',
              fontWeight: 600
            }}
          >
            {course.duration}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              color: 'text.secondary'
            }}
          >
            {course.notes}
          </Typography>
        </TableCell>

        <TableCell 
          sx={{ 
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            textAlign: 'center'
          }}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={handleRegisterClick}
            sx={{
              borderRadius: 2,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              px: { xs: 1, sm: 1.5 },
              py: { xs: 0.5, sm: 0.75 },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            تسجيل
          </Button>
        </TableCell>
      </TableRow>

      <CourseForm 
        open={openForm}
        onClose={handleCloseForm}
        course={course}
      />
    </>
  );
};

export default Course;
