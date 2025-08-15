import { 
  Box, 
  TextField, 
  Button, 
  MenuItem, 
  Paper, 
  Typography,
  useTheme,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import { Send as SendIcon, Print as PrintIcon } from '@mui/icons-material';
import React, { useState } from 'react';

const ContactForm = ({ onSubmitSuccess }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    rank: '',
    name: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const ranks = [
    'ملازم',
    'ملازم أول',
    'نقيب',
    'رائد',
    'مقدم',
    'عقيد',
    'عميد',
    'لواء',
    'فريق',
    'فريق أول'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rank.trim()) {
      newErrors.rank = 'الرتبة مطلوبة';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the success callback with form data
      onSubmitSuccess(formData);
      
      // Reset form
      setFormData({
        rank: '',
        name: '',
        message: ''
      });
      
      setShowAlert(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: { xs: '1.3rem', sm: '1.5rem' }
          }}
        >
          استمارة التواصل
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="الرتبة"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                error={!!errors.rank}
                helperText={errors.rank}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                  }
                }}
              >
                <MenuItem value="">
                  <em>اختر الرتبة</em>
                </MenuItem>
                {ranks.map((rank) => (
                  <MenuItem key={rank} value={rank}>
                    {rank}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الاسم"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="الرسالة"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message || `${formData.message.length}/500 حرف`}
                variant="outlined"
                inputProps={{ maxLength: 500 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    minWidth: { xs: '100%', sm: '200px' },
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    },
                    '&:disabled': {
                      background: theme.palette.action.disabledBackground,
                    }
                  }}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          تم إرسال رسالتك بنجاح!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
