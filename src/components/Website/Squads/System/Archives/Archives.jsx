import React, { useState, useEffect } from 'react';
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
  IconButton,
  Chip,
  Collapse,
  useTheme,
} from '@mui/material';
import { 
  Visibility as ViewIcon,
  FileDownload as ExcelIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

// import components
import SystemHeader from '../../Ui/SystemHeader';
import Audience from '../Attendance/Attendance';
import Distribution from '../Distribution/Distribution';
import Operations from '../Operations/Operations';
import Outsiders from '../Outsiders/Outsiders';

// import printing
import printArchives from './PrintArchives';
import printAttendance from "../Attendance/PrintAttendance";
import printDistribution from '../Distribution/PrintDistribution';
import printOperations from '../Operations/PrintOperations';
import printOutsiders from '../Outsiders/PrintOutsiders';

// import dummy data
import {
  audienceData,
  distributionData,
  operationsData,
  outsidersData
} from "../../../../../constants/DUMMY_DATA";
import CustomTableHead from '../../Ui/TableHead';



const Archives = ({ employees, onNavigateAway }) => {
  const theme = useTheme();
  const [expandedRow, setExpandedRow] = useState(null);

  const tableHeadContent = [
    { label: 'اليوم', style: { px: 2 } },
    { label: 'التاريخ' },
    { label: 'الوقت', style: { textAlign: 'center' } },
    { label: 'المستخدم' },
    { label: 'النوع', style: { textAlign: 'center' } },
    { label: 'التفاصيل' },
    { label: 'الخيارات', style: { textAlign: 'center' } },
  ];

  // Clear any existing navigation handlers when this component mounts
  useEffect(() => {
    if (onNavigateAway) {
      onNavigateAway(null);
    }
  }, [onNavigateAway]);

  // بيانات الأرشيف - كل الأحداث التي تحدث في الموقع
  const [archiveData, setArchiveData] = useState(employees);

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExport = (format, item) => {
    console.log(`Exporting ${format} for item:`, item);
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

  function ShowArchive(type) {
    if(type === 'حضور') return <Audience employees={audienceData} isShownInArchive={true} />;
    if(type === 'توزيع') return <Distribution employees={distributionData} isShownInArchive={true} />;
    if(type === 'عمليات') return <Operations employees={operationsData} isShownInArchive={true} />;

    return <Outsiders employees={outsidersData} isShownInArchive={true} />;
  }

  function handlePrint(type) {
    if(type === 'حضور') return printAttendance('الاولي', audienceData);
    if(type === 'توزيع') return printDistribution('الاولي', distributionData);
    if(type === 'عمليات') return printOperations('الاولي', operationsData);
    
    return printOutsiders('الاولي', outsidersData);
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
        <SystemHeader
          title={"إدارة الأرشيف"}
          isPrinting={true}
          isSaving={false}
          printFn={() => printArchives('الاولي', archiveData)}
        />

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
            <CustomTableHead columnsName={tableHeadContent} />

            <TableBody>
              {archiveData.map((item, index) => (
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
                          {item.rank}
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
                          onClick={() => handlePrint(item.type)}
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

                  {/* This is the expanded row for additional details */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                      <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                        {ShowArchive(item.type)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Archives;
