import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  useTheme,
  Alert,
  Grid
} from '@mui/material';
import { 
  Print as PrintIcon, 
  CheckCircle as CheckIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Star as StarIcon
} from '@mui/icons-material';
import React from 'react';

const ContactSuccess = ({ formData, onClose }) => {
  const theme = useTheme();

  const handlePrint = () => {
    const printContent = document.getElementById('contact-success-content');
    const originalContent = document.body.innerHTML;
    
    // Create print-specific styles
    const printStyles = `
      <style>
        @media print {
          body { 
            font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', Arial, sans-serif;
            direction: rtl;
            margin: 20px;
            background: white !important;
          }
          .print-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            border: 2px solid #1976d2 !important;
            border-radius: 10px !important;
            background: white !important;
          }
          .print-header {
            text-align: center;
            border-bottom: 2px solid #1976d2;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .print-title {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #1976d2 !important;
            margin-bottom: 10px !important;
          }
          .print-date {
            font-size: 14px !important;
            color: #666 !important;
          }
          .print-field {
            margin-bottom: 15px !important;
            padding: 10px !important;
            border: 1px solid #ddd !important;
            border-radius: 5px !important;
          }
          .print-label {
            font-weight: bold !important;
            color: #1976d2 !important;
            font-size: 16px !important;
            margin-bottom: 5px !important;
          }
          .print-value {
            font-size: 14px !important;
            color: #333 !important;
            line-height: 1.5 !important;
          }
          .print-footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
          }
        }
      </style>
    `;

    const printHtml = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>استمارة التواصل</title>
        ${printStyles}
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <div class="print-title">خفر السواحل الكويتي - استمارة التواصل</div>
            <div class="print-date">تاريخ الإرسال: ${new Date().toLocaleDateString('ar-SA')}</div>
          </div>
          
          <div class="print-field">
            <div class="print-label">الرتبة:</div>
            <div class="print-value">${formData.rank}</div>
          </div>
          
          <div class="print-field">
            <div class="print-label">الاسم:</div>
            <div class="print-value">${formData.name}</div>
          </div>
          
          <div class="print-field">
            <div class="print-label">الرسالة:</div>
            <div class="print-value">${formData.message}</div>
          </div>
          
          <div class="print-footer">
            تم إنشاء هذا المستند تلقائياً من نظام خفر السواحل الكويتي
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (!formData) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 3 }}>
      <Paper 
        elevation={4}
        sx={{ 
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }} id="contact-success-content">
          {/* Success Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckIcon sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                mb: 1,
                fontSize: { xs: '1.8rem', sm: '2.2rem' }
              }}
            >
              تم إرسال رسالتك بنجاح!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', mb: 3 }} />

          {/* Form Data Display */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper 
                sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: '#ffd700' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    الرتبة
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  {formData.rank}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper 
                sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: '#64b5f6' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    الاسم
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  {formData.name}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MessageIcon sx={{ mr: 1, color: '#81c784' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    الرسالة
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {formData.message}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: 4, 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center'
          }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              طباعة الاستمارة
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={onClose}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              إرسال رسالة جديدة
            </Button>
          </Box>

          {/* Timestamp */}
          <Box sx={{ textAlign: 'center', mt: 3, opacity: 0.8 }}>
            <Typography variant="body2">
              تم الإرسال في: {new Date().toLocaleString('ar-SA')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactSuccess;
