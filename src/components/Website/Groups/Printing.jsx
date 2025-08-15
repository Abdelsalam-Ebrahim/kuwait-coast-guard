import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import printAudienceContent from './Printing/Audience';
import printDistributionContent from './Printing/Distribution';
import printOperationsContent from './Printing/Operations';
import printCrewsContent from './Printing/Crews';
import printOutsidersContent from './Printing/Outsiders';

const Printing = () => {
  // Sample attendance data
  const attendanceData = [
    { id: 1, fullName: 'أحمد محمد علي', rank: 'ملازم أول', jobTitle: 'ضابط بحري', category: 'ضباط', attendance: 'حاضر' },
    { id: 2, fullName: 'محمد أحمد سالم', rank: 'ملازم', jobTitle: 'ضابط إنقاذ', category: 'ضباط', attendance: 'غائب' },
    { id: 3, fullName: 'علي سالم محمد', rank: 'رقيب أول', jobTitle: 'مشغل راديو', category: 'ضباط صف', attendance: 'غائب' },
    { id: 4, fullName: 'سالم أحمد علي', rank: 'رقيب', jobTitle: 'فني محركات', category: 'ضباط صف', attendance: 'غائب' },
    { id: 5, fullName: 'محمد علي أحمد', rank: 'عريف', jobTitle: 'بحار', category: 'أفراد', attendance: 'حاضر' },
    { id: 6, fullName: 'خالد عبدالله محمد', rank: 'نقيب', jobTitle: 'قائد دورية', category: 'ضباط', attendance: 'غائب' },
    { id: 7, fullName: 'عبدالرحمن سالم أحمد', rank: 'رقيب أول', jobTitle: 'مشغل رادار', category: 'ضباط صف', attendance: 'حاضر' },
  ];

  // Sample distribution data
  const distributionData = [
    { id: 1, fullName: 'أحمد محمد علي', jobTitle: 'ضابط بحري', rank: 'المنطقة الشمالية', distribution: 'دورية بحرية' },
    { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ضابط إنقاذ', rank: 'المنطقة الجنوبية', distribution: 'مراقبة ساحلية' },
    { id: 3, fullName: 'علي سالم محمد', jobTitle: 'مشغل راديو', rank: 'المنطقة الوسطى', distribution: 'اتصالات' },
  ];

  // Sample operations data
  const operationsData = [
    { id: 1, rank: 'ملازم أول', jobTitle: 'ضابط بحري', fullName: 'أحمد محمد علي', distribution: 'دورية بحرية', receiptLocation: 'الخليج الشمالي', phoneNumber: '12345678' },
    { id: 2, rank: 'ملازم', jobTitle: 'ضابط إنقاذ', fullName: 'محمد أحمد سالم', distribution: 'مراقبة ساحلية', receiptLocation: 'قبالة الجزيرة الخضراء', phoneNumber: '23456789' },
    { id: 3, rank: 'رقيب أول', jobTitle: 'مشغل راديو', fullName: 'علي سالم محمد', distribution: 'اتصالات', receiptLocation: 'المنطقة الوسطى', phoneNumber: '34567890' },
  ];

  // Sample outsiders data
  const outsidersData = [
    // has rank, jobtitle, name, reason, date, calender (from date to date)
    { id: 1, fullName: 'أحمد محمد علي', jobTitle: 'ملازم أول', rank: 'المنطقة الشمالية', reason: 'إجازة مرضية', exitDate: '2025-08-15', expectedReturn: '2025-08-17', date: 'صح' },
    { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ملازم', rank: 'المنطقة الجنوبية', reason: 'مهمة رسمية', exitDate: '2025-08-15', expectedReturn: '2025-08-16', date: 'صح' },
    { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ملازم', rank: 'المنطقة الجنوبية', reason: 'مهمة رسمية', date: 'خطأ' },

  ];

  // Sample crews data
  const crewsData = [
    { id: 1, crewName: 'طاقم ألفا', leader: 'أحمد محمد علي', assistant: 'محمد أحمد سالم', mission: 'دورية بحرية', area: 'المنطقة الشمالية', timing: '06:00 - 14:00' },
    { id: 2, crewName: 'طاقم بيتا', leader: 'علي سالم محمد', assistant: 'سالم أحمد علي', mission: 'مراقبة ساحلية', area: 'المنطقة الجنوبية', timing: '14:00 - 22:00' },
  ];

  const printingOptions = [
    { id: 'audience', title: 'طباعة الحضور', enabled: true },
    { id: 'distribution', title: 'طباعة التوزيع', enabled: true },
    { id: 'operations', title: 'طباعة العمليات', enabled: true },
    { id: 'crews', title: 'طباعة الطواقم', enabled: true },
    { id: 'outsiders', title: 'طباعة الخوارج', enabled: true }
  ];

  // Handle printing - directly open print window
  const handlePrint = (option) => {
    if (!option.enabled) return;
    
    if (option.id === 'audience') {
      printAudienceContent('الأولى', attendanceData);
    } else if (option.id === 'distribution') {
      printDistributionContent('الأولى', distributionData);
    } else if (option.id === 'operations') {
      printOperationsContent('الأولى', operationsData);
    } else if (option.id === 'crews') {
      printCrewsContent('الأولى', crewsData);
    } else if (option.id === 'outsiders') {
      printOutsidersContent('الأولى', outsidersData);
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        gap: 2,
        margin: '0 auto',
        '@media (max-width: 600px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 1.5
        }
      }}
    >
      {printingOptions.map((option) => (
        <Paper
          key={option.id}
          elevation={2}
          onClick={() => handlePrint(option)}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 3,
            height: '100%',
            minHeight: { xs: 80, sm: 100 },
            border: '1px solid',
            borderColor: option.enabled ? 'divider' : 'grey.300',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            cursor: option.enabled ? 'pointer' : 'not-allowed',
            opacity: option.enabled ? 1 : 0.6,
            transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
            '&:hover': {
              transform: option.enabled ? 'translateY(-3px)' : 'none',
              boxShadow: option.enabled ? 6 : 2
            }
          }}
        >
          <Stack spacing={1.5} alignItems="center" textAlign="center">
            <Box sx={{
              width: { xs: 52, sm: 56 },
              height: { xs: 52, sm: 56 },
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: option.enabled ? 'primary.main' : 'grey.400',
              color: option.enabled ? 'primary.contrastText' : 'grey.600',
              boxShadow: option.enabled ? 2 : 1,
              mb: 0.5
            }}>
              <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                color: option.enabled ? 'text.primary' : 'text.disabled'
              }}
            >
              {option.title}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default Printing;
