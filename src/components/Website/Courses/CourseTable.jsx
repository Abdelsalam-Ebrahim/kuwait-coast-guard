import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material';
import Course from './Course';

const CourseTable = ({ coursesData }) => {
  const theme = useTheme();

  return (
    <TableContainer 
      component={Paper} 
      elevation={2} 
      sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: 8,
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
      <Table sx={{ minWidth: 1000 }}>
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
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 120, sm: 150 }
              }}
            >
              اسم الدورة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 80, sm: 100 }
              }}
            >
              الفئة المشاركة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                textAlign: 'center',
                minWidth: { xs: 60, sm: 80 }
              }}
            >
              العدد
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 100, sm: 120 }
              }}
            >
              الجهة المنفذة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 80, sm: 100 }
              }}
            >
              بداية الدورة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 80, sm: 100 }
              }}
            >
              نهاية الدورة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 60, sm: 80 }
              }}
            >
              المدة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                minWidth: { xs: 80, sm: 100 }
              }}
            >
              ملاحظات
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 0.5, sm: 1 },
                letterSpacing: '0.5px',
                textAlign: 'center',
                minWidth: { xs: 80, sm: 100 }
              }}
            >
              التسجيل
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coursesData.map((course, index) => (
            <Course 
              key={course.id} 
              course={course} 
              index={index}
              theme={theme}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;
