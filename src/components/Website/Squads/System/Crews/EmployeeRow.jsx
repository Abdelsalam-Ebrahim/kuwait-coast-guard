import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  useTheme
} from '@mui/material';

const EmployeeRow = ({ employee, tableIndex }) => {
  const theme = useTheme();

  return (
    <TableRow 
      sx={{
        backgroundColor: tableIndex % 2 === 0 
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
          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
          fontWeight: 600,
          color: 'text.primary',
          py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
          px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
          borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
          width: '40%',
          wordBreak: 'break-word'
        }}
      >
        {employee.rank}
      </TableCell>
      <TableCell 
        sx={{ 
          fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem', lg: '0.75rem' },
          fontWeight: 500,
          color: 'primary.main',
          py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
          px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
          borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          minWidth: { xs: 70, sm: 90, md: 100, lg: 90 },
          width: '25%',
        }}
      >
        {employee.jobTitle}
      </TableCell>
      <TableCell 
        sx={{ 
          py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
          px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
          borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
          width: '35%'
        }}
      >
        <Typography 
          variant="body2"
          sx={{ 
            fontSize: { xs: '0.65rem', sm: '0.72rem', md: '0.75rem', lg: '0.72rem' },
            fontWeight: 600,
            color: 'text.secondary',
            wordBreak: 'break-word'
          }}
        >
          {employee.name}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
