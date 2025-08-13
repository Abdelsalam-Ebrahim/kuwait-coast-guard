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
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Collapse,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Visibility as ViewIcon,
  FileDownload as ExcelIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Archives = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  // بيانات الأرشيف - كل الأحداث التي تحدث في الموقع
  const [archiveData, setArchiveData] = useState([
    {
      id: 1,
      day: "الأحد",
      date: "2025-01-15",
      time: "08:30",
      user: "أحمد محمد علي",
      coastGuardId: "CG001",
      type: "حضور",
      details: "تسجيل حضور في الوقت المحدد",
      fullDetails: {
        location: "القاعدة الرئيسية",
        department: "العمليات البحرية",
        notes: "حضور منتظم بدون تأخير"
      }
    },
    {
      id: 2,
      day: "الأحد", 
      date: "2025-01-15",
      time: "09:15",
      user: "فاطمة سعد العتيبي",
      coastGuardId: "CG002",
      type: "توزيع",
      details: "تم توزيع الموظف على المنطقة رقم 10",
      fullDetails: {
        assignedArea: "المنطقة 10",
        supervisor: "خالد عبدالله المطيري",
        duration: "8 ساعات",
        equipment: "زورق دورية، جهاز لاسلكي"
      }
    },
    {
      id: 3,
      day: "الأحد",
      date: "2025-01-15", 
      time: "10:45",
      user: "خالد عبدالله المطيري",
      coastGuardId: "CG003",
      type: "إجازة",
      details: "طلب إجازة مرضية لمدة 3 أيام",
      fullDetails: {
        leaveType: "إجازة مرضية",
        duration: "3 أيام",
        startDate: "2025-01-16",
        endDate: "2025-01-18",
        reason: "مراجعة طبية"
      }
    },
    {
      id: 4,
      day: "الأحد",
      date: "2025-01-15",
      time: "11:20",
      user: "نورا حسين الشمري", 
      coastGuardId: "CG004",
      type: "تدريب",
      details: "حضور دورة تدريبية في الإسعافات الأولية",
      fullDetails: {
        trainingType: "الإسعافات الأولية",
        instructor: "د. محمد الرشيد",
        location: "قاعة التدريب الرئيسية",
        duration: "4 ساعات"
      }
    },
    {
      id: 5,
      day: "الأحد",
      date: "2025-01-15",
      time: "14:30",
      user: "عبدالرحمن صالح القحطاني",
      coastGuardId: "CG005", 
      type: "مهمة",
      details: "مهمة دورية في المياه الإقليمية",
      fullDetails: {
        missionType: "دورية بحرية",
        area: "المياه الإقليمية - القطاع الشمالي",
        vessel: "زورق الدورية رقم 15",
        crew: "4 أفراد"
      }
    },
    {
      id: 6,
      day: "الأحد",
      date: "2025-01-15",
      time: "16:00",
      user: "مريم أحمد الدوسري",
      coastGuardId: "CG006",
      type: "انصراف",
      details: "انتهاء الدوام وتسجيل الانصراف",
      fullDetails: {
        shiftEnd: "16:00",
        overtimeHours: "0",
        handoverNotes: "تم تسليم المهام للدوام المسائي",
        status: "مكتمل"
      }
    }
  ]);

  // فلترة البيانات حسب البحث
  const filteredData = archiveData.filter(item => 
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.coastGuardId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExport = (format, item) => {
    console.log(`Exporting ${format} for item:`, item);
    // هنا يمكن إضافة منطق التصدير الفعلي
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'حضور': return 'success';
      case 'انصراف': return 'info'; 
      case 'توزيع': return 'primary';
      case 'إجازة': return 'warning';
      case 'مهمة': return 'secondary';
      case 'تدريب': return 'info';
      default: return 'default';
    }
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
            أرشيف الأحداث
          </Typography>
          
          {/* صندوق البحث */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              width: { xs: '100%', sm: 'auto' },
              alignItems: 'center'
            }}
          >
            <TextField
              placeholder="البحث بالاسم أو رقم السواحل..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 300 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* عرض عدد النتائج */}
        {searchTerm && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              تم العثور على {filteredData.length} نتيجة من أصل {archiveData.length}
            </Typography>
          </Box>
        )}

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
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 1.5, sm: 2 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 70, sm: 80 }
                  }}
                >
                  اليوم
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 90, sm: 100 }
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
                    minWidth: { xs: 60, sm: 70 }
                  }}
                >
                  الوقت
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 120, sm: 150 }
                  }}
                >
                  المستخدم
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
                    minWidth: { xs: 80, sm: 90 }
                  }}
                >
                  النوع
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 150, sm: 200 }
                  }}
                >
                  التفاصيل
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
                  الخيارات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow 
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
                      }
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: 500,
                        color: 'text.primary',
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 1.5, sm: 2 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                      }}
                    >
                      {item.day}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        color: 'text.secondary',
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                      }}
                    >
                      {item.date}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        color: 'text.secondary',
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                        direction: 'ltr'
                      }}
                    >
                      {item.time}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                          {item.user}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          {item.coastGuardId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                        textAlign: 'center'
                      }}
                    >
                      <Chip
                        label={item.type}
                        color={getTypeColor(item.type)}
                        size="small"
                        sx={{
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          fontWeight: 600
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
                        maxWidth: 200
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' }
                        }}
                      >
                        {item.details}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        py: { xs: 0.5, sm: 1 },
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                        textAlign: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleExpandRow(item.id)}
                          sx={{ 
                            color: 'primary.main',
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                          }}
                          title="عرض التفاصيل"
                        >
                          {expandedRow === item.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleExport('excel', item)}
                          sx={{ 
                            color: 'success.main',
                            '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                          }}
                          title="تصدير إكسل"
                        >
                          <ExcelIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleExport('pdf', item)}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                          }}
                          title="تصدير PDF"
                        >
                          <PdfIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleExport('print', item)}
                          sx={{ 
                            color: 'text.secondary',
                            '&:hover': { backgroundColor: 'rgba(158, 158, 158, 0.1)' }
                          }}
                          title="طباعة"
                        >
                          <PrintIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  
                  {/* صف التفاصيل الموسع */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                      <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Card elevation={2} sx={{ borderRadius: 2 }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                                تفاصيل الحدث - {item.type}
                              </Typography>
                              
                              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                <Box>
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    معلومات أساسية:
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>المستخدم:</strong> {item.user}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>رقم السواحل:</strong> {item.coastGuardId}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>التاريخ والوقت:</strong> {item.date} - {item.time}
                                  </Typography>
                                </Box>
                                
                                <Box>
                                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    تفاصيل إضافية:
                                  </Typography>
                                  {Object.entries(item.fullDetails).map(([key, value]) => (
                                    <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                                      <strong>{key}:</strong> {value}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* رسالة عدم وجود نتائج */}
        {filteredData.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              لا توجد نتائج مطابقة لبحثك
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              جرب البحث بكلمات مختلفة أو امسح مربع البحث لعرض جميع الأحداث
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Archives;
