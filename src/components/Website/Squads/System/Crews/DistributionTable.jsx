import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import EmployeeRow from './EmployeeRow';

const DistributionTable = ({ employees, tableIndex }) => {
  return (
    <TableContainer 
      component={Paper} 
      elevation={0} 
      sx={{ 
        border: 1, 
        borderColor: 'divider',
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        overflowX: 'auto',
        width: '100%',
        '&::-webkit-scrollbar': {
          height: { xs: 6, sm: 8 },
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 4,
        },
      }}
    >
      <Table sx={{ minWidth: { xs: 300, sm: 350, lg: 450 }, width: '100%' }}>
        <TableHead>
          <TableRow 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '& .MuiTableCell-head': {
                borderBottom: 'none'
              }
            }}
          >
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                width: '40%'
              }}
            >
              الرتبة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 70, sm: 90, md: 100, lg: 90 },
                width: '25%'
              }}
            >
              المسمى
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                width: '35%'
              }}
            >
              الاسم 
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee, empIndex) => (
            <EmployeeRow 
              key={empIndex} 
              employee={employee} 
              empIndex={empIndex} 
              tableIndex={tableIndex} 
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistributionTable;
