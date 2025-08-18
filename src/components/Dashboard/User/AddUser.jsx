import { Box } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

import ConfirmationModal from '../Ui/ConfirmationModal';
import UserFormBase from './Shared/UserFormBase';
import useUserManager from './Shared/useUserManager';

// Import your HTTP functions here
import { addEmployee } from "../../../util/employeeHttp";

const AddUser = () => {
  const {
    confirmationOpen,
    setConfirmationOpen,
    formData,
    handleInputChange,
    handleSubmit,
    generateConfirmationMessage,
    isPending
  } = useUserManager(
    addEmployee,
    'تم إضافة الموظف بنجاح',
    'حدث خطأ أثناء إضافة الموظف',
    'add'
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <UserFormBase
        formData={formData}
        onSubmit={() => setConfirmationOpen(true)}
        onChange={handleInputChange}
        title="إضافة موظف جديد"
        icon={PersonAddIcon}
        submitButtonText="إضافة موظف"
      />

      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleSubmit}
        title="تأكيد إضافة موظف"
        message={generateConfirmationMessage('إضافة')}
        confirmText="تأكيد الإضافة"
        confirmColor="success"
        isLoading={isPending}
        showWarning={false}
      />
    </Box>
  );
};

export default AddUser;
