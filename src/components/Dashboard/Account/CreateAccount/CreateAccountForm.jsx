import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  AccountCircle as AccountIcon,
  Lock as LockIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const CreateAccountForm = ({ onSubmit, resetForm }) => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    permissions: {
      printing: false,
      audience: false,
      distribution: false,
      operations: false,
      crews: false,
      outsiders: false,
      archive: false,
      secretLevel1: false,
      secretLevel2: false,
      secretLevel3: false,
      sendNotification: false,
      accessDashboard: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset form when resetForm prop changes
  React.useEffect(() => {
    if (resetForm) {
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        permissions: {
          printing: false,
          audience: false,
          distribution: false,
          operations: false,
          crews: false,
          outsiders: false,
          archive: false,
          secretLevel1: false,
          secretLevel2: false,
          secretLevel3: false,
          sendNotification: false,
          accessDashboard: false
        }
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [resetForm]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (permission, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.username || !formData.password || !formData.confirmPassword) {
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

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمة المرور وتأكيد كلمة المرور غير متطابقتين', {
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

    // Validate password length
    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل', {
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
        إنشاء حساب جديد
      </Typography>

      <Grid container spacing={2}>
        {/* اسم المستخدم */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="اسم المستخدم *"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* كلمة المرور */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="كلمة المرور *"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* تأكيد كلمة المرور */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="تأكيد كلمة المرور *"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>

        {/* Divider */}
        <Grid item xs={12} width="100%">
          <Divider sx={{ my: 2 }} />
        </Grid>
        
        {/* صلاحيات النظام Header */}
        <Grid item xs={12} width="100%">
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 600, 
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SecurityIcon color="primary" />
            صلاحيات النظام
          </Typography>
        </Grid>

        {/* الطباعة */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.printing}
                onChange={(e) => handlePermissionChange('printing', e.target.checked)}
                color="primary"
              />
            }
            label="الطباعة"
          />
        </Grid>

        {/* الحضور */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.audience}
                onChange={(e) => handlePermissionChange('audience', e.target.checked)}
                color="primary"
              />
            }
            label="الحضور"
          />
        </Grid>

        {/* التوزيع */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.distribution}
                onChange={(e) => handlePermissionChange('distribution', e.target.checked)}
                color="primary"
              />
            }
            label="التوزيع"
          />
        </Grid>

        {/* العمليات */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.operations}
                onChange={(e) => handlePermissionChange('operations', e.target.checked)}
                color="primary"
              />
            }
            label="العمليات"
          />
        </Grid>

        {/* الطواقم */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.crews}
                onChange={(e) => handlePermissionChange('crews', e.target.checked)}
                color="primary"
              />
            }
            label="الطواقم"
          />
        </Grid>

        {/* الخوارج */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.outsiders}
                onChange={(e) => handlePermissionChange('outsiders', e.target.checked)}
                color="primary"
              />
            }
            label="الخوارج"
          />
        </Grid>

        {/* الأرشيف */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.archive}
                onChange={(e) => handlePermissionChange('archive', e.target.checked)}
                color="primary"
              />
            }
            label="الأرشيف"
          />
        </Grid>

        {/* السرية الأولى */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.secretLevel1}
                onChange={(e) => handlePermissionChange('secretLevel1', e.target.checked)}
                color="primary"
              />
            }
            label="السرية الأولى"
          />
        </Grid>

        {/* السرية الثانية */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.secretLevel2}
                onChange={(e) => handlePermissionChange('secretLevel2', e.target.checked)}
                color="primary"
              />
            }
            label="السرية الثانية"
          />
        </Grid>

        {/* السرية الثالثة */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.secretLevel3}
                onChange={(e) => handlePermissionChange('secretLevel3', e.target.checked)}
                color="primary"
              />
            }
            label="السرية الثالثة"
          />
        </Grid>

        {/* يرسل إشعار */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.sendNotification}
                onChange={(e) => handlePermissionChange('sendNotification', e.target.checked)}
                color="primary"
              />
            }
            label="يرسل إشعار"
          />
        </Grid>

        {/* يدخل للوحة التحكم */}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.accessDashboard}
                onChange={(e) => handlePermissionChange('accessDashboard', e.target.checked)}
                color="primary"
              />
            }
            label="يدخل للوحة التحكم"
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} width="100%">
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
              إنشاء حساب
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateAccountForm;
