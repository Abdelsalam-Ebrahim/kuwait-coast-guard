// importing ui styling
import toast from 'react-hot-toast';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';

// importing queries
import { useQuery } from '@tanstack/react-query';
import InputText from '../../Ui/InputText';
import InputSelection from '../../Ui/InputSelection';
import { getAllSquads } from "../../../../util/squadHttp";
import { getAllCategory } from '../../../../util/categoryHttp';

const UserFormBase = ({ 
  formData, 
  onChange, 
  onSubmit, 
  title, 
  icon: Icon, 
  submitButtonText,
  selectedEmployee = null
}) => {
  const { 
    data: squadData, 
    isPending: squadIsPending,
    error: squadError,
    isError: squadIsError
  } = useQuery({
    queryKey: ["squads"],
    queryFn: ({ signal }) => getAllSquads(signal),
  });

  const {
    data: categoryData, 
    isPending: categoryIsPending, 
    error: categoryError, 
    isError: categoryIsError 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getAllCategory(signal),
  });

  const handleSubmit = () => {
    // Validation for Edit User (must have selected employee)
    if (selectedEmployee !== null && !selectedEmployee) {
      return toast.error('يرجى اختيار موظف للتعديل');
    }

    const { name, jobTitle, rank, categoryId, phoneNumber, squadId } = formData;

    if (!name || !jobTitle || !rank || !categoryId || !phoneNumber || !squadId) {
      return toast.error('يرجى ملء جميع الحقول المطلوبة');
    }

    if (name.length < 3) {
      return toast.error('الاسم يجب أن يحتوي على 3 أحرف على الأقل');
    }

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return toast.error('يرجى إدخال رقم هاتف صحيح (10 - 15 رقم)');
    }

    onSubmit();
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
        <Icon color="primary" />
        {title}
      </Typography>

      <Grid container spacing={2}>
        <InputText name="name" label="الاسم *" value={formData.name} onChange={onChange} />
        <InputText name="jobTitle" label="المسمى الوظيفي *" value={formData.jobTitle} onChange={onChange} />
        <InputText name="rank" label="الرتبة *" value={formData.rank} onChange={onChange} />
        <InputText name="phoneNumber" label="رقم الهاتف *" value={formData.phoneNumber} onChange={onChange} inputType='tel' />

        <InputSelection
          name="categoryId"
          key={categoryData?.traceId}
          data={categoryData?.data}
          error={categoryError}
          value={formData.categoryId}
          onChange={onChange}
          isError={categoryIsError}
          isPending={categoryIsPending}
          label="الفئة *"
          creatingText="يجب اختيار الفئة"
        />

        <InputSelection
          name="squadId"
          key={squadData?.traceId}
          data={squadData?.data}
          error={squadError}
          value={formData.squadId}
          onChange={onChange}
          isError={squadIsError}
          isPending={squadIsPending}
          label="السرية *"
          creatingText="يجب اختيار السرية"
        />

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              startIcon={<Icon />}
              sx={{
                minWidth: { xs: '100%', sm: 200 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                py: 1.5
              }}
            >
              {submitButtonText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserFormBase;
