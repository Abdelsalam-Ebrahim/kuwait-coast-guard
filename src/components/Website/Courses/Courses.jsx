import React from 'react';
import {
  Typography, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CourseTable from './CourseTable';

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

      <CourseTable coursesData={coursesData} />
    </Box>
  );
};

export default Courses;
