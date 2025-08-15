import React from 'react';
import { Alert, AlertTitle, Box, Button, Paper, Typography, useMediaQuery, useTheme, Grid, Divider } from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';

const MalfunctionSuccess = ({ data, onClose, onPrint }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const darkMode = theme.palette.mode === 'dark';

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        background: darkMode
          ? 'linear-gradient(135deg, #1e1e2f 0%, #2a2a3d 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: darkMode
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(103, 126, 234, 0.2)',
      }}
    >
      <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
        <AlertTitle>تم الإرسال</AlertTitle>
        تم إرسال البلاغ بنجاح، سنقوم بمراجعته والتواصل عند الحاجة.
      </Alert>

      {data ? (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main', textAlign: 'center' }}
          >
            ملخص البلاغ
          </Typography>
          <Box
            sx={{
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <Grid container spacing={{ xs: 1.25, sm: 1.5 }} sx={{ direction: 'rtl' }}>
              {[
                { label: 'الرتبة', value: data.rank },
                { label: 'الاسم', value: data.name },
                { label: 'سواحل', value: data.coasts },
                { label: 'الموقع', value: data.location },
                { label: 'نوع البلاغ', value: data.reportType },
              ].map((row, idx, arr) => (
                <Grid key={row.label} item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 700, minWidth: 90 }}
                    >
                      {row.label}:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.primary', fontWeight: 600, wordBreak: 'break-word' }}
                    >
                      {row.value || '-'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : null}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
        }}
      >
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          إغلاق
        </Button>
        <Button
          onClick={onPrint}
          variant="contained"
          startIcon={<PrintIcon />}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #218838 0%, #1da588 100%)',
            },
          }}
        >
          طباعة
        </Button>
      </Box>
    </Paper>
  );
};

export default MalfunctionSuccess;
