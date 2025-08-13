import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Crews = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  // بيانات التوزيع الأول
  const firstDistribution = [
    { name: "فهد سالم فرج السعد", jobTitle: "قائد زورق", assignedName: "أحمد محمد علي" },
    { name: "فهد حمد العجمي", jobTitle: "قائد زورق", assignedName: "محمد حسن إبراهيم" },
    { name: "حسين يونس عباس حسين دشتي", jobTitle: "نوخذه", assignedName: "علي أحمد محمد" },
    { name: "عبدالرحمن احمد العدواني", jobTitle: "نوخذه", assignedName: "حسن علي أحمد" },
    { name: "محمد حيدر محمد علي حيدر", jobTitle: "بحار", assignedName: "إبراهيم محمد حسن" },
  ];

  // بيانات التوزيع الثاني
  const secondDistribution = [
    { name: "حسين فهد احمد عبدالله البلوشي", jobTitle: "بحار", assignedName: "خالد أحمد محمد" },
    { name: "جومون كورياكوسى", jobTitle: "ميكانيك", assignedName: "سعد محمد علي" },
    { name: "ميثون بال رانجان بال", jobTitle: "طباخ", assignedName: "عبدالله حسن محمد" },
    { name: "فينكاترامان راماسامي", jobTitle: "كهرباء", assignedName: "محمود علي أحمد" },
  ];

  // بيانات التوزيع الثالث
  const thirdDistribution = [
    { name: "احمد شويب شودري", jobTitle: "طباخ", assignedName: "يوسف محمد حسن" },
    { name: "ام دي راشد الزمان", jobTitle: "ميكانيك", assignedName: "طارق أحمد علي" },
    { name: "ام دي جهانغير", jobTitle: "طباخ", assignedName: "ماجد محمد إبراهيم" },
    { name: "عبدالله المامون خان", jobTitle: "طباخ", assignedName: "نادر حسن أحمد" },
  ];

  const distributions = [
    { title: "التوزيع الأول", data: firstDistribution },
    { title: "التوزيع الثاني", data: secondDistribution },
    { title: "التوزيع الثالث", data: thirdDistribution },
  ];

  const renderTable = (distribution, index) => {
    // حساب الإحصائيات
    const stats = distribution.data.reduce((acc, employee) => {
      acc[employee.jobTitle] = (acc[employee.jobTitle] || 0) + 1;
      return acc;
    }, {});

    const totalCount = distribution.data.length;

    return (
      <Box key={index} sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="h2" 
          sx={{ 
            fontWeight: 600,
            mb: 2,
            color: 'primary.main'
          }}
        >
          {distribution.title}
        </Typography>
        
        {/* إحصائيات التوزيع */}
        <Box 
          sx={{ 
            mb: 3,
            p: 2,
            backgroundColor: 'rgba(103, 126, 234, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(103, 126, 234, 0.2)'
          }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              mb: 1,
              color: 'primary.main',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            إحصائيات التوزيع
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2 },
              alignItems: 'center'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                fontWeight: 600
              }}
            >
              المجموع: {totalCount}
            </Typography>
            {Object.entries(stats).map(([jobTitle, count]) => (
              <Typography 
                key={jobTitle}
                variant="body2" 
                sx={{ 
                  backgroundColor: 'rgba(103, 126, 234, 0.1)',
                  color: 'primary.main',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  fontWeight: 500,
                  border: '1px solid rgba(103, 126, 234, 0.3)'
                }}
              >
                {jobTitle}: {count}
              </Typography>
            ))}
          </Box>
        </Box>
        
        <TableContainer 
          component={Paper} 
          elevation={0} 
          sx={{ 
            border: 1, 
            borderColor: 'divider',
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
          <Table sx={{ minWidth: 650 }}>
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
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 150, sm: 180 }
                  }}
                >
                  الاسم
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 100, sm: 120 }
                  }}
                >
                  المسمى
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 150, sm: 180 }
                  }}
                >
                  الاسم المكلف
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {distribution.data.map((employee, empIndex) => (
                <TableRow 
                  key={empIndex} 
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
                      fontSize: { xs: '0.8rem', sm: '0.95rem' },
                      fontWeight: 600,
                      color: 'text.primary',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 150, sm: 180 }
                    }}
                  >
                    {employee.name}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontWeight: 500,
                      color: 'primary.main',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    {employee.jobTitle}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 150, sm: 180 }
                    }}
                  >
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        fontWeight: 600,
                        color: 'text.secondary'
                      }}
                    >
                      {employee.assignedName}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' }, 
            mb: 3,
            gap: { xs: 2, sm: 1 }
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              textAlign: { xs: 'center', sm: 'right' }
            }}
          >
            إدارة الفرق
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ 
                borderRadius: 2,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              حفظ التغييرات
            </Button>

            <Button
              component={Link}
              to="/print-preview/crews"
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{ 
                borderRadius: 2,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              طباعة التقرير
            </Button>
          </Box>
        </Box>

        {distributions.map((distribution, index) => renderTable(distribution, index))}
      </Paper>
    </Box>
  );
};

export default Crews;
