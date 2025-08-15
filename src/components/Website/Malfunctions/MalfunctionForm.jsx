import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// props: values, onChange(field, value), onSubmit()
const MalfunctionForm = ({ values, onChange, onSubmit, submitting }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const darkMode = theme.palette.mode === 'dark';

  const isValid = useMemo(() => {
    const { rank, name, coasts, location, reportType } = values || {};
    return Boolean(rank && name && coasts && location && reportType);
  }, [values]);

  const size = isMobile ? 'small' : 'medium';

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography sx={{ mb: 3, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
        نموذج البلاغ
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size={size}
            label="الرتبة"
            value={values.rank || ''}
            onChange={(e) => onChange('rank', e.target.value)}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size={size}
            label="الاسم"
            value={values.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            size={size}
            label="سواحل"
            value={values.coasts || ''}
            onChange={(e) => onChange('coasts', e.target.value)}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            {['الشمالية', 'الجنوبية', 'الشرقية', 'الغربية'].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size={size}
            label="الموقع"
            value={values.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            size={size}
            label="نوع البلاغ"
            value={values.reportType || ''}
            onChange={(e) => onChange('reportType', e.target.value)}
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            {['انقطاع', 'عطل جزئي', 'عطل كامل', 'أخرى'].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth={isMobile}
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!isValid || submitting}
            onClick={onSubmit}
            sx={{
              mt: 2,
              borderRadius: 2,
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              '&:disabled': {
                background: 'rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            إرسال
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MalfunctionForm;
