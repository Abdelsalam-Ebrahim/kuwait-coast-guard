import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const AddUserForm = ({ onSubmit, resetForm }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    rank: '',
    name: '',
    category: '',
    phoneNumber: '',
    securityLevel: '' // Optional field
  });

  // Security level options
  const securityLevelOptions = [
    { value: 'level1', label: 'السرية الأولى' },
    { value: 'level2', label: 'السرية الثانية' },
    { value: 'level3', label: 'السرية الثالثة' }
  ];

  // Reset form when resetForm prop changes
  React.useEffect(() => {
    if (resetForm) {
      setFormData({
        jobTitle: '',
        rank: '',
        name: '',
        category: '',
        phoneNumber: '',
        securityLevel: ''
      });
    }
  }, [resetForm]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields (including security level)
    if (!formData.name || !formData.jobTitle || !formData.rank || !formData.category || !formData.phoneNumber || !formData.securityLevel) {
      toast.error('يرجى ملء جميع الحقول المطلوبة', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        borderRadius: 2,
        border: 1,
        borderColor: 'divider'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 600, 
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <PersonAddIcon color="primary" />
        إضافة موظف جديد
      </Typography>

      <Grid container spacing={2}>
        {/* الاسم */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="الاسم *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* المسمى الوظيفي */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="المسمى الوظيفي *"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* الرتبة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="الرتبة *"
            value={formData.rank}
            onChange={(e) => handleInputChange('rank', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* الفئة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="الفئة *"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* رقم الهاتف */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="رقم الهاتف *"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* مستوى السرية */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="مستوى السرية *"
            value={formData.securityLevel}
            onChange={(e) => handleInputChange('securityLevel', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            helperText="يجب اختيار مستوى السرية"
          >
            {securityLevelOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              startIcon={<PersonAddIcon />}
              sx={{
                minWidth: { xs: '100%', sm: 200 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                py: 1.5
              }}
            >
              إضافة موظف
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddUserForm;
