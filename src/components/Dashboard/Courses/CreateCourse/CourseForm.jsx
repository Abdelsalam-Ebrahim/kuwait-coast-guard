import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import {
  School as SchoolIcon,
  Add as AddIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const CourseForm = ({ onSubmit, resetForm }) => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    courseName: '',
    category: '',
    participants: '',
    count: '',
    executingAuthority: '',
    startDate: '',
    endDate: '',
    duration: '',
    notes: ''
  });

  // Reset form when resetForm prop changes
  useEffect(() => {
    if (resetForm) {
      setFormData({
        courseName: '',
        category: '',
        participants: '',
        count: '',
        executingAuthority: '',
        startDate: '',
        endDate: '',
        duration: '',
        notes: ''
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
    // Validate required fields
    if (!formData.courseName || !formData.category || !formData.participants || 
        !formData.count || !formData.executingAuthority || !formData.startDate || 
        !formData.endDate || !formData.duration || !formData.notes) {
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

    // Validate count is a number
    if (isNaN(formData.count) || formData.count <= 0) {
      toast.error('يجب أن يكون العدد رقماً صحيحاً أكبر من صفر', {
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

    // Validate dates
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error('يجب أن يكون تاريخ بداية الدورة قبل تاريخ النهاية', {
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
        <SchoolIcon color="primary" />
        إضافة دورة جديدة
      </Typography>

      <Grid container spacing={2}>
        {/* اسم الدورة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="اسم الدورة *"
            value={formData.courseName}
            onChange={(e) => handleInputChange('courseName', e.target.value)}
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
            placeholder="مثل: طبية، بحرية، أمنية، تقنية"
          />
        </Grid>

        {/* المشاركة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="المشاركة *"
            value={formData.participants}
            onChange={(e) => handleInputChange('participants', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            placeholder="مثل: ضباط، ضباط صف، جميع الرتب"
          />
        </Grid>

        {/* العدد */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="العدد *"
            type="number"
            value={formData.count}
            onChange={(e) => handleInputChange('count', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            inputProps={{ min: 1 }}
          />
        </Grid>

        {/* الجهة المنفذة */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="الجهة المنفذة *"
            value={formData.executingAuthority}
            onChange={(e) => handleInputChange('executingAuthority', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            placeholder="مثل: الإدارة الطبية، الإدارة البحرية، إدارة الأمن"
          />
        </Grid>

        {/* المدة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="المدة *"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            placeholder="مثل: 15 يوم، 4 أسابيع، 3 أشهر"
          />
        </Grid>

        {/* ملاحظات */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ملاحظات *"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            placeholder="أي ملاحظات إضافية حول الدورة"
          />
        </Grid>

        {/* بداية الدورة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="بداية الدورة *"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* نهاية الدورة */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="نهاية الدورة *"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              startIcon={<AddIcon />}
              sx={{
                minWidth: { xs: '100%', sm: 200 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                py: 1.5
              }}
            >
              إضافة دورة
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CourseForm;
