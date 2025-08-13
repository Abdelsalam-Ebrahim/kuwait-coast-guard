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
  Checkbox,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Audience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const employees = [
    { attendance: true, jobTitle: "ملازم اول", rank: "قائد زورق", fullName: "فهد سالم فرج السعد", category: "ضباط" },
    { attendance: false, jobTitle: "ملازم اول", rank: "قائد زورق", fullName: "فهد حمد العجمي", category: "ضباط" },
    { attendance: true, jobTitle: "وكيل اول ضابط", rank: "نوخذه", fullName: "حسين يونس عباس حسين دشتي", category: "نواخذة" },
    { attendance: false, jobTitle: "وكيل ضابط", rank: "نوخذه", fullName: "عبدالرحمن احمد العدواني", category: "نواخذة" },
    { attendance: true, jobTitle: "وكيل ضابط", rank: "بحار", fullName: "محمد حيدر محمد علي حيدر", category: "بحرية" },
    { attendance: true, jobTitle: "وكيل ضابط", rank: "بحار", fullName: "حسين فهد احمد عبدالله البلوشي", category: "بحرية" },
    { attendance: true, jobTitle: "مهني فني", rank: "ميكانيك", fullName: "جومون كورياكوسى", category: "مهني فني" },
    { attendance: false, jobTitle: "مهني طباخ", rank: "طباخ", fullName: "ميثون بال رانجان بال", category: "مهني طباخ" },
    { attendance: true, jobTitle: "مهني فني", rank: "كهرباء", fullName: "فينكاترامان راماسامي", category: "مهني فني" },
    { attendance: false, jobTitle: "الجيش البنغالي طباخ", rank: "طباخ", fullName: "احمد شويب شودري", category: "الجيش البنغالي طباخ" },
    { attendance: true, jobTitle: "الجيش البنغالي فني", rank: "ميكانيك", fullName: "ام دي راشد الزمان", category: "الجيش البنغالي فني" },
    { attendance: true, jobTitle: "الجيش البنغالي طباخ", rank: "طباخ", fullName: "ام دي جهانغير", category: "الجيش البنغالي طباخ" },
    { attendance: true, jobTitle: "الجيش البنغالي طباخ", rank: "طباخ", fullName: "عبدالله المامون خان", category: "الجيش البنغالي طباخ" },
    { attendance: false, jobTitle: "مدني فني", rank: "ديــزل", fullName: "احمد نجيب علي قاسم", category: "مدني فني" },
    { attendance: true, jobTitle: "مدني فني", rank: "ديــزل", fullName: "حسن علي دشتي", category: "مدني فني" },
  ];
  
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
            إدارة الحضور
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
              to="/print-preview/attendance"
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
                    textAlign: 'center',
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 70, sm: 80 }
                  }}
                >
                  الحضور
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
                  المسمى الوظيفي
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 80, sm: 100 }
                  }}
                >
                  الرتبة
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
                  الاسم الكامل
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
                  الفئة
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow 
                  key={index} 
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
                      textAlign: 'center',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 70, sm: 80 }
                    }}
                  >
                    <Checkbox 
                      defaultChecked={employee.attendance}
                      color="primary"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: { xs: '1.1rem', sm: '1.3rem' }
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      color: 'text.secondary',
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
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontWeight: 500,
                      color: 'primary.main',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    {employee.rank}
                  </TableCell>
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
                    {employee.fullName}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    <Typography 
                      variant="caption"
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        fontWeight: 600,
                      }}
                    >
                      {employee.category}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Audience;
