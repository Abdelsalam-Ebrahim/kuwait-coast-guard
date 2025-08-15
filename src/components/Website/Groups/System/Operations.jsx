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
  useMediaQuery
} from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Operations = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const placeOfReceiptOptions = [
    "الجبريه",
    "الاحمديه", 
    "القاعده",
    "الكويت"
  ];

  const [employeesData, setEmployeesData] = useState([
    { rank: "قائد زورق", jobTitle: "ملازم اول", fullName: "فهد سالم فرج السعد", placeOfReceipt: "", distribution: "10", phone: "50000001" },
    { rank: "قائد زورق", jobTitle: "ملازم اول", fullName: "فهد حمد العجمي", placeOfReceipt: "", distribution: "20", phone: "50000002" },
    { rank: "نوخذه", jobTitle: "وكيل اول ضابط", fullName: "حسين يونس عباس حسين دشتي", placeOfReceipt: "", distribution: "", phone: "50000003" },
    { rank: "نوخذه", jobTitle: "وكيل ضابط", fullName: "عبدالرحمن احمد العدواني", placeOfReceipt: "", distribution: "", phone: "50000004" },
    { rank: "بحار", jobTitle: "وكيل ضابط", fullName: "محمد حيدر محمد علي حيدر", placeOfReceipt: "", distribution: "420", phone: "50000005" },
    { rank: "بحار", jobTitle: "وكيل ضابط", fullName: "حسين فهد احمد عبدالله البلوشي", placeOfReceipt: "", distribution: "10", phone: "50000006" },
    { rank: "ميكانيك", jobTitle: "مهني فني", fullName: "جومون كورياكوسى", placeOfReceipt: "", distribution: "", phone: "50000007" },
  ]);

  const handlePlaceOfReceiptChange = (index, newValue) => {
    const updatedEmployees = [...employeesData];
    updatedEmployees[index].placeOfReceipt = newValue;
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
            إدارة العمليات
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
              to="/print-preview/operations"
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
          <Table sx={{ minWidth: 850 }}>
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
                    minWidth: { xs: 80, sm: 100 }
                  }}
                >
                  التوزيع
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
                  مكان الاستلام
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
                    minWidth: { xs: 90, sm: 110 }
                  }}
                >
                  الهاتف
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
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: employee.distribution ? 600 : 400,
                        color: employee.distribution ? 'success.main' : 'text.secondary',
                        backgroundColor: employee.distribution ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                        px: { xs: 0.5, sm: 1.5 },
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {employee.distribution || "غير محدد"}
                    </Typography>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 120 } }}>
                      <Select
                        value={employee.placeOfReceipt}
                        onChange={(e) => handlePlaceOfReceiptChange(index, e.target.value)}
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
                          اختر المكان
                        </MenuItem>
                        {placeOfReceiptOptions.map((option) => (
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
                      minWidth: { xs: 90, sm: 110 }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: 500,
                        color: 'text.primary',
                        direction: 'ltr'
                      }}
                    >
                      {employee.phone}
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

export default Operations;
