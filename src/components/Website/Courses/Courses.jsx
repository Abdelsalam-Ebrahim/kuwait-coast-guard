import React from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Course from './Course';

const Courses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const coursesData = [
    {
      id: 1,
      name: "دورة الإسعافات الأولية",
      category: "ضباط وأفراد",
      participantsCount: 25,
      executingEntity: "مركز التدريب البحري",
      startDate: "2025-01-15",
      endDate: "2025-01-25",
      duration: "10 أيام",
      notes: "دورة أساسية لجميع العاملين"
    },
    {
      id: 2,
      name: "دورة السلامة البحرية",
      category: "ضباط",
      participantsCount: 15,
      executingEntity: "الأكاديمية البحرية",
      startDate: "2025-02-01",
      endDate: "2025-02-15",
      duration: "15 يوم",
      notes: "دورة متقدمة للضباط"
    },
    {
      id: 3,
      name: "دورة صيانة المحركات",
      category: "فنيين",
      participantsCount: 20,
      executingEntity: "معهد التدريب التقني",
      startDate: "2025-02-20",
      endDate: "2025-03-05",
      duration: "14 يوم",
      notes: "دورة تخصصية للفنيين"
    },
    {
      id: 4,
      name: "دورة القيادة البحرية",
      category: "نواخذة",
      participantsCount: 12,
      executingEntity: "مركز التدريب البحري",
      startDate: "2025-03-10",
      endDate: "2025-03-30",
      duration: "20 يوم",
      notes: "دورة قيادية متخصصة"
    },
    {
      id: 5,
      name: "دورة الاتصالات البحرية",
      category: "أفراد الاتصالات",
      participantsCount: 18,
      executingEntity: "أكاديمية الاتصالات",
      startDate: "2025-04-05",
      endDate: "2025-04-20",
      duration: "16 يوم",
      notes: "دورة تقنية متخصصة"
    }
  ];

  return (
    <Box maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            color: 'primary.main',
            mb: 1
          }}
        >
          الدورات التدريبية
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            color: 'text.secondary',
            mb: 3
          }}
        >
          قائمة الدورات التدريبية المتاحة للتسجيل
        </Typography>
      </Box>

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
    </Box>
  );
};

export default Courses;
