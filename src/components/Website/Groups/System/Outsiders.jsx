import React, { useState } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Checkbox,
  TextField
} from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Outsiders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const reasonOptions = [
    "إجازة مرضية",
    "إجازة سنوية",
    "إجازة طارئة",
    "مهمة رسمية",
    "تدريب خارجي",
    "انتداب",
    "إجازة بدون راتب",
    "غياب بعذر",
    "أخرى"
  ];

  const [employeesData, setEmployeesData] = useState([
    { rank: "رائد", jobTitle: "ضابط عمليات", fullName: "أحمد محمد علي", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "نقيب", jobTitle: "ضابط إداري", fullName: "فاطمة سعد العتيبي", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "ملازم أول", jobTitle: "ضابط تدريب", fullName: "خالد عبدالله المطيري", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "ملازم", jobTitle: "ضابط أمن", fullName: "نورا حسين الشمري", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "رقيب أول", jobTitle: "فني صيانة", fullName: "عبدالرحمن صالح القحطاني", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "رقيب", jobTitle: "مسؤول إداري", fullName: "مريم أحمد الدوسري", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
    { rank: "عريف", jobTitle: "عامل عمليات", fullName: "سعد محمد الرشيد", reason: "", hasDate: false, dateFrom: "", dateTo: "" },
  ]);

  const handleReasonChange = (index, newValue) => {
    const updatedEmployees = [...employeesData];
    updatedEmployees[index].reason = newValue;
    setEmployeesData(updatedEmployees);
  };

  const handleDateCheckboxChange = (index, checked) => {
    const updatedEmployees = [...employeesData];
    updatedEmployees[index].hasDate = checked;
    if (!checked) {
      updatedEmployees[index].dateFrom = "";
      updatedEmployees[index].dateTo = "";
    }
    setEmployeesData(updatedEmployees);
  };

  const handleDateChange = (index, field, value) => {
    const updatedEmployees = [...employeesData];
    updatedEmployees[index][field] = value;
    setEmployeesData(updatedEmployees);
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
            إدارة الخارجيين
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
              to="/print-preview/outsiders"
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
          <Table sx={{ minWidth: 800 }}>
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
                    px: { xs: 2, sm: 3 },
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
                    minWidth: { xs: 120, sm: 140 }
                  }}
                >
                  السبب
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    minWidth: { xs: 60, sm: 80 }
                  }}
                >
                  التاريخ
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    minWidth: { xs: 200, sm: 250 }
                  }}
                >
                  من - إلى
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeesData.map((employee, index) => (
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
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontWeight: 500,
                      color: 'primary.main',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 2, sm: 3 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    {employee.rank}
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
                      minWidth: { xs: 120, sm: 140 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 110, sm: 140 } }}>
                      <Select
                        value={employee.reason}
                        onChange={(e) => handleReasonChange(index, e.target.value)}
                        displayEmpty
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                          }
                        }}
                      >
                        <MenuItem value="" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: 'text.secondary' }}>
                          اختر السبب
                        </MenuItem>
                        {reasonOptions.map((option) => (
                          <MenuItem key={option} value={option} sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      textAlign: 'center',
                      minWidth: { xs: 60, sm: 80 }
                    }}
                  >
                    <Checkbox
                      checked={employee.hasDate}
                      onChange={(e) => handleDateCheckboxChange(index, e.target.checked)}
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      textAlign: 'center',
                      minWidth: { xs: 200, sm: 250 }
                    }}
                  >
                    {employee.hasDate ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                          type="date"
                          size="small"
                          value={employee.dateFrom}
                          onChange={(e) => handleDateChange(index, 'dateFrom', e.target.value)}
                          sx={{
                            minWidth: { xs: 120, sm: 140 },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.75rem', sm: '0.85rem' },
                              padding: { xs: '6px 8px', sm: '8px 12px' }
                            }
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                          إلى
                        </Typography>
                        <TextField
                          type="date"
                          size="small"
                          value={employee.dateTo}
                          onChange={(e) => handleDateChange(index, 'dateTo', e.target.value)}
                          sx={{
                            minWidth: { xs: 120, sm: 140 },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.75rem', sm: '0.85rem' },
                              padding: { xs: '6px 8px', sm: '8px 12px' }
                            }
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        غير مطلوب
                      </Typography>
                    )}
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

export default Outsiders;
