import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  Print as PrintIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const CourseForm = ({ open, onClose, course }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const darkMode = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    jobTitle: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const inputSize = isMobile ? 'small' : 'medium';

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.rank && formData.jobTitle) {
      setSubmitted(true);
      console.log('تم إرسال الاستمارة:', { ...formData, courseId: course.id });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    setFormData({ name: '', rank: '', jobTitle: '' });
    setSubmitted(false);
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  };

  if (!course) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="course-form-title"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          background: darkMode
            ? 'linear-gradient(135deg, #1e1e2f 0%, #2a2a3d 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          mx: { xs: 0, sm: 1.5 },
          my: { xs: 0, sm: 2 },
        },
      }}
    >
      <DialogTitle
        id="course-form-title"
        sx={{
          background: darkMode
            ? 'linear-gradient(135deg, #3a3a5a 0%, #2f2f46 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          py: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <SchoolIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
          >
            استمارة التسجيل في الدورة
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          aria-label="إغلاق"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 1, sm: 2 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            background: darkMode
              ? 'linear-gradient(135deg, #2b2b3d 0%, #232333 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: darkMode
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(103, 126, 234, 0.2)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.3rem' },
            }}
          >
            🎓 {course.name}
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {[
              { label: 'الجهة المنفذة', value: course.executingEntity, color: 'text.primary' },
              { label: 'مدة الدورة', value: course.duration, color: 'secondary.main' },
              { label: 'تاريخ البداية', value: formatDate(course.startDate), color: 'success.main' },
              { label: 'تاريخ النهاية', value: formatDate(course.endDate), color: 'error.main' },
            ].map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Box sx={{ p: { xs: 1, sm: 2 }, textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      mb: 1,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: item.color,
                      fontWeight: 600,
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

        {!submitted ? (
          <>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mb: 2.5,
                textAlign: 'center',
              }}
            >
              بيانات المتقدم
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {[
                { label: 'الاسم الكامل', value: formData.name, field: 'name' },
                { label: 'الرتبة', value: formData.rank, field: 'rank', half: true },
                { label: 'المسمى الوظيفي', value: formData.jobTitle, field: 'jobTitle', half: true },
              ].map((input, i) => (
                <Grid item xs={12} md={input.half ? 6 : 12} key={i}>
                  <TextField
                    fullWidth
                    label={input.label}
                    value={input.value}
                    onChange={handleInputChange(input.field)}
                    variant="outlined"
                    required
                    size={inputSize}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Alert
            severity="success"
            sx={{
              borderRadius: 2,
              fontSize: '1rem',
              '& .MuiAlert-message': {
                textAlign: 'center',
                width: '100%',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              تم إرسال الاستمارة بنجاح!
            </Typography>
            <Typography variant="body2">سيتم مراجعة طلبكم والتواصل معكم قريباً</Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2, sm: 3 },
          gap: 1,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        {!submitted ? (
          <>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<SendIcon />}
              disabled={!formData.name || !formData.rank || !formData.jobTitle}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                width: { xs: '100%', sm: 'auto' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              إرسال الاستمارة
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              إغلاق
            </Button>
            <Button
              onClick={handlePrint}
              variant="contained"
              startIcon={<PrintIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                width: { xs: '100%', sm: 'auto' },
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #218838 0%, #1da588 100%)',
                },
              }}
            >
              طباعة الاستمارة
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CourseForm;
