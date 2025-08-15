import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  useTheme
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const EditAccountForm = ({ 
  user, 
  onSave, 
  onCancel,
  isLoading 
}) => {
  const theme = useTheme();

  // Initialize form state with user data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    permissions: {
      home: false,
      groups: false,
      weather: false,
      crews: false,
      audience: false,
      operations: false,
      distribution: false,
      outsiders: false,
      printing: false,
      archiving: false,
      userManagement: false,
      accountManagement: false
    }
  });

  const [passwordError, setPasswordError] = useState('');

  // Password validation function
  const validatePassword = (password) => {
    if (!password || password.trim() === '') {
      return 'كلمة المرور مطلوبة';
    }
    
    if (password.length < 6) {
      return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    
    if (!hasLetter) {
      return 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل';
    }
    
    if (!hasDigit) {
      return 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل';
    }
    
    return '';
  };

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: user.password || '',
        permissions: {
          home: user.permissions?.home || false,
          groups: user.permissions?.groups || false,
          weather: user.permissions?.weather || false,
          crews: user.permissions?.crews || false,
          audience: user.permissions?.audience || false,
          operations: user.permissions?.operations || false,
          distribution: user.permissions?.distribution || false,
          outsiders: user.permissions?.outsiders || false,
          printing: user.permissions?.printing || false,
          archiving: user.permissions?.archiving || false,
          userManagement: user.permissions?.userManagement || false,
          accountManagement: user.permissions?.accountManagement || false
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear password error when user starts typing
    if (name === 'password' && passwordError) {
      setPasswordError('');
    }
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password before submission
    const passwordValidationError = validatePassword(formData.password);
    
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      toast.error(passwordValidationError, {
        position: 'top-right',
        duration: 4000
      });
      return;
    }

    // Validate username
    if (!formData.username || formData.username.trim() === '') {
      toast.error('اسم المستخدم مطلوب', {
        position: 'top-right',
        duration: 3000
      });
      return;
    }

    // If validation passes, call onSave
    onSave(formData);
  };

  const permissionLabels = {
    home: 'الرئيسية',
    groups: 'المجموعات',
    weather: 'حالة الطقس',
    crews: 'الطواقم',
    audience: 'الجمهور',
    operations: 'العمليات',
    distribution: 'التوزيع',
    outsiders: 'الخارجين',
    printing: 'الطباعة',
    archiving: 'الأرشفة',
    userManagement: 'إدارة المستخدمين',
    accountManagement: 'إدارة الحسابات'
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={2} sx={{ borderRadius: 2, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          تعديل الحساب - {user?.username}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Username Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="اسم المستخدم"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                variant="outlined"
                disabled={isLoading}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="كلمة المرور"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                disabled={isLoading}
                helperText="يجب أن تحتوي على 6 أحرف، حرف واحد ورقم واحد على الأقل"
              />
            </Grid>

            {/* Permissions Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                الصلاحيات
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(permissionLabels).map(([key, label]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.permissions[key]}
                          onChange={() => handlePermissionChange(key)}
                          disabled={isLoading}
                        />
                      }
                      label={label}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  startIcon={<CancelIcon />}
                  disabled={isLoading}
                  sx={{ borderRadius: 1 }}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={isLoading}
                  sx={{ borderRadius: 1 }}
                >
                  حفظ التغييرات
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditAccountForm;
