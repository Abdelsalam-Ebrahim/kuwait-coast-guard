// importing hooks
import { useContext, useState } from 'react';

// importing auth context
import { AuthContext } from '../../store/AuthContext';

// importing react-query
import { useMutation } from '@tanstack/react-query';

//
import { login as loginFn } from '../../util/authHttp';

// importing ui styling
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const Login = () => {
  // Form state
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { authenticate } = useContext(AuthContext);
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      authenticate(data.data.token, data.data.user || {});
      toast.success('تم تسجيل الدخول بنجاح');
      return <Navigate to="/home" replace />;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };


  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            تسجيل الدخول
          </Typography>
          <Typography variant="body1" color="text.secondary">
            حرس السواحل الكويتي
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            name="username"
            label="اسم المستخدم"
            value={formData.username}
            onChange={handleInputChange}
            error={isError && error.field === 'username'}
            helperText={isError && error.field === 'username' ? error.message : ''}
            margin="normal"
            autoComplete="username"
            disabled={isPending}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="password"
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            error={isError && error.field === 'password'}
            helperText={isError && error.field === 'password' ? error.message : ''}
            margin="normal"
            autoComplete="current-password"
            disabled={isPending}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                    disabled={isPending}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isPending}
            sx={{ 
              mt: 2, 
              mb: 2, 
              height: 48,
              fontSize: '1.1rem'
            }}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;