import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const SearchResult = ({ searchResults = [], isLoading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (employeeId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedRows(newExpanded);
  };

  const getGroupName = (groupId) => {
    switch (groupId) {
      case 1: return 'السرية الأولى';
      case 2: return 'السرية الثانية';
      case 3: return 'السرية الثالثة';
      default: return 'غير محدد';
    }
  };

  const getGroupColor = (groupId) => {
    const isDark = theme.palette.mode === 'dark';
    switch (groupId) {
      case 1: return isDark ? '#4a90e2' : '#1e3c72'; // Brighter blue for dark mode
      case 2: return isDark ? '#5ba3f5' : '#2a5298'; // Brighter medium blue for dark mode
      case 3: return isDark ? '#6db4ff' : '#3d6db7'; // Brighter light blue for dark mode
      default: return isDark ? '#888' : '#666';
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ py: 3 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6">جاري البحث...</Typography>
        </Paper>
      </Box>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          border: 1, 
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <Box 
          sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, mb: 1 }}>
            نتائج البحث
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            تم العثور على {searchResults.length} نتيجة من جميع السرايا
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          {searchResults.map((employee, index) => (
            <Card 
              key={`${employee.groupId}-${employee.id}-${index}`} 
              sx={{ 
                mb: 3, 
                borderRadius: 2, 
                border: 1,
                borderColor: 'divider',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* Employee Header */}
                <Box 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {employee.fullName}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {employee.rank} - {employee.jobTitle}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip
                    label={getGroupName(employee.groupId)}
                    color={getGroupColor(employee.groupId)}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      color: theme.palette.mode === 'dark' 
                        ? 'primary.contrastText' 
                        : 'primary.main',
                      border: theme.palette.mode === 'dark' 
                        ? '1px solid rgba(255, 255, 255, 0.3)' 
                        : 'none',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(255, 255, 255, 1)',
                      }
                    }}
                  />
                </Box>

                {/* Employee Summary */}
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(0, 0, 0, 0.1)' 
                    : 'rgba(0, 0, 0, 0.02)' 
                }}>
                  <Grid container  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AssignmentIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          رقم التوزيع:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {employee.distribution || 'غير محدد'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DateRangeIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          عدد أيام العمل:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {employee.workDays?.length || 0} يوم
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          آخر مكان استلام:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {employee.workDays?.[0]?.placeOfReceipt || 'غير محدد'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <IconButton
                        onClick={() => toggleRowExpansion(`${employee.groupId}-${employee.id}-${index}`)}
                        sx={{ 
                          color: 'primary.main',
                          bgcolor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.04)',
                          '&:hover': { 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText',
                            transform: 'scale(1.05)'
                          },
                          borderRadius: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {expandedRows.has(`${employee.groupId}-${employee.id}-${index}`) ? 
                          <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          عرض التفاصيل
                        </Typography>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>

                {/* Detailed Work History Table */}
                <Collapse in={expandedRows.has(`${employee.groupId}-${employee.id}-${index}`)}>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      color: 'primary.main', 
                      fontWeight: 700 
                    }}>
                      سجل العمل التفصيلي
                    </Typography>
                    
                    {employee.workDays && employee.workDays.length > 0 ? (
                      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
                        <Table size={isMobile ? "small" : "medium"}>
                          <TableHead>
                            <TableRow 
                              sx={{ 
                                bgcolor: 'primary.main',
                                '& .MuiTableCell-head': {
                                  borderBottom: 'none'
                                }
                              }}
                            >
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                الرقم
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                اليوم
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                التاريخ
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                الرتبة
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                المسمى
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                الاسم
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                التوزيع
                              </TableCell>
                              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, textAlign: 'center' }}>
                                مكان الاستلام
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {employee.workDays.map((workDay, dayIndex) => (
                              <TableRow 
                                key={dayIndex}
                                sx={{ 
                                  '&:nth-of-type(odd)': { 
                                    backgroundColor: theme.palette.mode === 'dark' 
                                      ? 'rgba(255, 255, 255, 0.05)' 
                                      : 'rgba(0, 0, 0, 0.02)' 
                                  },
                                  '&:nth-of-type(even)': { 
                                    backgroundColor: theme.palette.mode === 'dark' 
                                      ? theme.palette.background.paper 
                                      : 'rgba(255, 255, 255, 1)' 
                                  },
                                  '&:hover': { 
                                    backgroundColor: theme.palette.mode === 'dark' 
                                      ? 'rgba(255, 255, 255, 0.08)' 
                                      : 'rgba(0, 0, 0, 0.04)',
                                    transition: 'background-color 0.2s ease'
                                  }
                                }}
                              >
                                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                                  {dayIndex + 1}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {workDay.dayOfWeek}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {workDay.date}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {employee.rank}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {employee.jobTitle}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>
                                  {employee.fullName}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  <Chip 
                                    label={employee.distribution || 'غير محدد'}
                                    size="small"
                                    sx={{ 
                                      bgcolor: 'primary.main',
                                      color: 'primary.contrastText',
                                      fontWeight: 600,
                                      '&:hover': {
                                        bgcolor: 'primary.dark',
                                        transition: 'background-color 0.2s ease'
                                      }
                                    }}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {workDay.placeOfReceipt || 'غير محدد'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        لا توجد بيانات تفصيلية متاحة لهذا الموظف
                      </Alert>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchResult;
