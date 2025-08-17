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
import SystemHeader from '../SystemHeader';
import Canoes from '../Canoes/Canoes';
import Units from '../Units/Units';
import Rabs from '../Rabs/Rabs';
import Tampa from '../Tampa/Tampa';
import Concept from '../Concept/Concept';
import Magnum from '../Magnum/Magnum';


// import printing
import printArchives from './PrintArchives';
import printCanoes from "../Canoes/printCanoes";
import printUnits from '../Units/printUnits';
import printRabs from '../Rabs/printRabs';
import printTampa from '../Tampa/printTampa';
import printConcept from '../Concept/printConcept';
import printMagnum from '../Magnum/printMagnum';


// import dummy data
import {
  audienceData,
  distributionData,
  operationsData,
  outsidersData
} from "../../../../../constants/DUMMY_DATA";



const Archives = ({ malfunctions }) => {
  const theme = useTheme();
  const [expandedRow, setExpandedRow] = useState(null);

  // بيانات الأرشيف - كل الأحداث التي تحدث في الموقع
  const [archiveData, setArchiveData] = useState(malfunctions);

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
    if(type === 'الزوارق') return <Canoes malfunctions={audienceData} isShownInArchive={true} />;
    if(type === 'الوحدات') return <Units malfunctions={distributionData} isShownInArchive={true} />;
    if(type === 'الربس') return <Rabs malfunctions={operationsData} isShownInArchive={true} />;
    if(type === 'تامبه') return <Tampa malfunctions={operationsData} isShownInArchive={true} />;
    if(type === 'كونسبت') return <Concept malfunctions={operationsData} isShownInArchive={true} />;


    return <Magnum malfunctions={outsidersData} isShownInArchive={true} />;
  }

  function handlePrint(type) {
    if(type === 'الزوارق') return printCanoes('الاولي', audienceData);
    if(type === 'الوحدات') return printUnits('الاولي', distributionData);
    if(type === 'الربس') return printRabs('الاولي', operationsData);
    if(type === 'تامبه') return printTampa('الاولي', operationsData);
    if(type === 'كونسبت') return printConcept('الاولي', operationsData);

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
                        // color={getTypeColor(item.type)}
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
