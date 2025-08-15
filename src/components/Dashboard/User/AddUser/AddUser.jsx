import React, { useState } from 'react';
import AddUserForm from './AddUserForm';
import { Box, useTheme } from '@mui/material';
import ConfirmationModal from '../../ConfirmationModal';
import toast from 'react-hot-toast';

const AddUser = () => {
  const theme = useTheme();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setConfirmationOpen(true);
  };

  const handleConfirmAdd = async () => {
    if (!formData) return;

    setIsAdding(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your API
      console.log('Adding employee:', formData);
      
      setIsAdding(false);
      setConfirmationOpen(false);
      
      toast.success(`تم إضافة الموظف "${formData.name}" بنجاح`, {
        position: 'top-right',
        duration: 4000,
        style: {
          background: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });

      // Reset form and clear data
      setFormData(null);
      setResetForm(true);
      
      // Reset the resetForm flag after a short delay
      setTimeout(() => setResetForm(false), 100);
    } catch (error) {
      setIsAdding(false);
      toast.error('حدث خطأ أثناء إضافة الموظف', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });
    }
  };

  const handleConfirmCancel = () => {
    setConfirmationOpen(false);
    setFormData(null);
  };

  const generateConfirmationMessage = () => {
    if (!formData) return '';
    
    return `هل أنت متأكد من إضافة الموظف التالي؟

الاسم: ${formData.name}
المسمى الوظيفي: ${formData.jobTitle}
الرتبة: ${formData.rank}
الفئة: ${formData.category}
رقم الهاتف: ${formData.phoneNumber}`;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      
      <AddUserForm onSubmit={handleFormSubmit} resetForm={resetForm} />
      
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleConfirmCancel}
        onConfirm={handleConfirmAdd}
        title="تأكيد إضافة موظف"
        message={generateConfirmationMessage()}
        confirmText="تأكيد الإضافة"
        confirmColor="success"
        isLoading={isAdding}
        showWarning={false}
      />
    </Box>
  );
};

export default AddUser;
