import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import CreateAccountForm from './CreateAccountForm';
import ConfirmationModal from '../../Ui/ConfirmationModal';
import toast from 'react-hot-toast';

const CreateAccount = () => {
  const theme = useTheme();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setConfirmationOpen(true);
  };

  const handleConfirmCreate = async () => {
    if (!formData) return;

    setIsCreating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your API
      console.log('Creating account:', formData);
      
      setIsCreating(false);
      setConfirmationOpen(false);
      
      toast.success(`تم إنشاء حساب "${formData.username}" بنجاح`, {
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
      setIsCreating(false);
      toast.error('حدث خطأ أثناء إنشاء الحساب', {
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
    
    const selectedPermissions = Object.entries(formData.permissions)
      .filter(([_, value]) => value)
      .map(([key]) => {
        const permissionNames = {
          printing: 'الطباعة',
          audience: 'الحضور',
          distribution: 'التوزيع',
          operations: 'العمليات',
          crews: 'الطواقم',
          outsiders: 'الخوارج',
          archive: 'الأرشيف',
          secretLevel1: 'السرية الأولى',
          secretLevel2: 'السرية الثانية',
          secretLevel3: 'السرية الثالثة',
          sendNotification: 'يرسل إشعار',
          accessDashboard: 'يدخل للوحة التحكم'
        };
        return permissionNames[key];
      });
    
    return `هل أنت متأكد من إنشاء الحساب التالي؟

اسم المستخدم: ${formData.username}
كلمة المرور: ${'*'.repeat(formData.password.length)}

الصلاحيات المحددة:
${selectedPermissions.length > 0 ? selectedPermissions.join(' - ') : 'لا توجد صلاحيات محددة'}`;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <CreateAccountForm onSubmit={handleFormSubmit} resetForm={resetForm} />
      
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleConfirmCancel}
        onConfirm={handleConfirmCreate}
        title="تأكيد إنشاء حساب"
        message={generateConfirmationMessage()}
        confirmText="تأكيد الإنشاء"
        confirmColor="success"
        isLoading={isCreating}
        showWarning={false}
        actionType="create"
      />
    </Box>
  );
};

export default CreateAccount;
