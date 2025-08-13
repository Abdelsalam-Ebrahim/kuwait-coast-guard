import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../../constants/colors';

const PrintPreview = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const printTypes = {
    attendance: {
      title: 'طباعة الحضور',
      content: 'وثيقة الحضور'
    },
    distribution: {
      title: 'طباعة التوزيع',
      content: 'وثيقة التوزيع'
    },
    operations: {
      title: 'طباعة العمليات',
      content: 'وثيقة العمليات'
    },
    crews: {
      title: 'طباعة الطواقم',
      content: 'وثيقة الطواقم'
    },
    outsiders: {
      title: 'طباعة الخوارج',
      content: 'وثيقة الخوارج'
    }
  };

  const currentPrint = printTypes[type];

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (!currentPrint) {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f5f5f5',
        zIndex: 9999,
        overflow: 'auto'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ color: colors.primaryColor }}>
            نوع الطباعة غير موجود
          </Typography>
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={<CloseIcon />}
            sx={{ 
              mt: 2,
              minWidth: '120px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: 1,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#dc3545' }
            }}
          >
            إغلاق
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#f5f5f5',
      zIndex: 9999,
      overflow: 'auto'
    }}>
      {/* Control buttons - hidden when printing */}
      <Box 
        className="no-print"
        sx={{
          position: 'fixed',
          top: 2,
          right: 2,
          display: 'flex',
          gap: 1,
          zIndex: 10000,
          '@media print': {
            display: 'none !important'
          }
        }}
      >
        <Button
          variant="contained"
          onClick={handleClose}
          startIcon={<CloseIcon />}
          sx={{
            minWidth: '120px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: 1,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#f44336',
            '&:hover': { backgroundColor: '#dc3545' }
          }}
        >
          إغلاق
        </Button>
        <Button
          variant="contained"
          onClick={handlePrint}
          startIcon={<PrintIcon />}
          sx={{
            minWidth: '120px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: 1,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: colors.primaryColor,
            '&:hover': { backgroundColor: colors.blue600 }
          }}
        >
          طباعة
        </Button>
      </Box>

      {/* Print content */}
      <Paper 
        elevation={3}
        sx={{
          maxWidth: '210mm', // A4 width
          minHeight: '297mm', // A4 height
          margin: '20px auto',
          backgroundColor: 'white',
          padding: '20mm', // Standard margin for A4
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          '@media print': {
            boxShadow: 'none',
            margin: 0,
            padding: '15mm',
            maxWidth: 'none',
            minHeight: 'auto'
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: `3px solid ${colors.primaryColor}`,
          '@media print': {
            marginBottom: '20px',
            paddingBottom: '15px'
          }
        }}>
          <Box
            component="img"
            src="/logo.png" 
            alt="شعار خفر السواحل الكويتي"
            sx={{
              width: '80px',
              height: '80px',
              marginLeft: '20px',
              objectFit: 'contain',
              '@media print': {
                width: '60px',
                height: '60px',
                marginLeft: '15px'
              }
            }}
          />
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: colors.primaryColor,
                mb: 1,
                '@media print': {
                  fontSize: '1.8rem'
                }
              }}
            >
              خفر السواحل الكويتي
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: '600',
                color: colors.blue700,
                '@media print': {
                  fontSize: '1.4rem'
                }
              }}
            >
              {currentPrint.title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ lineHeight: 1.6 }}>
          <Card 
            elevation={1}
            sx={{
              marginBottom: '25px',
              backgroundColor: '#f8f9fa',
              '@media print': {
                marginBottom: '20px',
                backgroundColor: '#f8f9fa !important'
              }
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  <strong>التاريخ:</strong> {new Date().toLocaleDateString('ar-EG')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  <strong>الوقت:</strong> {new Date().toLocaleTimeString('ar-EG')}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 'bold',
                color: colors.primaryColor,
                mb: 3,
                textAlign: 'center',
                '@media print': {
                  fontSize: '1.2rem',
                  mb: 2
                }
              }}
            >
              محتوى {currentPrint.content}
            </Typography>
            
            {/* Sample table for demonstration */}
            <TableContainer component={Paper} elevation={1}>
              <Table sx={{
                marginBottom: '30px',
                '& .MuiTableCell-head': {
                  backgroundColor: `${colors.primaryColor} !important`,
                  color: 'white !important',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                },
                '& .MuiTableCell-root': {
                  border: '1px solid #333',
                  textAlign: 'center',
                  padding: '12px 8px',
                  fontSize: '0.95rem'
                },
                '@media print': {
                  marginBottom: '20px',
                  '& .MuiTableCell-head': {
                    backgroundColor: `${colors.primaryColor} !important`,
                    color: 'white !important'
                  },
                  '& .MuiTableCell-root': {
                    border: '1px solid #333 !important',
                    fontSize: '0.9rem'
                  }
                }
              }}>
                <TableHead>
                  <TableRow>
                    <TableCell>م</TableCell>
                    <TableCell>الاسم</TableCell>
                    <TableCell>الرقم العسكري</TableCell>
                    <TableCell>التوقيع</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <TableRow key={num}>
                      <TableCell>{num}</TableCell>
                      <TableCell>_________________</TableCell>
                      <TableCell>_________________</TableCell>
                      <TableCell>_________________</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mt: 6 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '50px',
              '@media print': {
                marginTop: '40px'
              }
            }}>
              <Box sx={{ textAlign: 'center', width: '180px' }}>
                <Typography variant="body1" gutterBottom sx={{ fontWeight: '600' }}>
                  توقيع المسؤول
                </Typography>
                <Box sx={{
                  borderBottom: '2px solid #333',
                  marginTop: '40px',
                  width: '100%'
                }} />
              </Box>
              <Box sx={{ textAlign: 'center', width: '180px' }}>
                <Typography variant="body1" gutterBottom sx={{ fontWeight: '600' }}>
                  الختم الرسمي
                </Typography>
                <Box sx={{
                  borderBottom: '2px solid #333',
                  marginTop: '40px',
                  width: '100%'
                }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Enhanced Print styles */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          /* Hide browser print headers/footers */
          @page {
            margin: 0.5in;
            size: A4;
          }
        }
      `}</style>
    </Box>
  );
};

export default PrintPreview;
