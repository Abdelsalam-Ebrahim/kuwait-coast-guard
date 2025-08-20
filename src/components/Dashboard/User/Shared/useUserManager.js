import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from "../../../../util/constants";
import toast from 'react-hot-toast';
import { useAuth } from '../../../../store/AuthContext';


const initialFormData = {
  name: '',
  rank: '',
  jobTitle: '',
  phoneNumber: '',
  categoryId: '',
  squadId: ''
};

const useUserManager = (mutationFn, successMessage, errorMessage, mode = 'add') => {
  const { token } = useAuth();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => mutationFn(formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allEmployees'] });
      toast.success(successMessage);
      setFormData(initialFormData);
      if (mode === 'edit') {
        setSelectedEmployee(null);
      }
      setConfirmationOpen(false);
    },
    onError: () => {
      toast.error(errorMessage);
      setConfirmationOpen(false);
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    // Pre-fill form with employee data
    setFormData({
      name: employee.name || '',
      jobTitle: employee.jobTitle || '',
      rank: employee.rank || '',
      phoneNumber: employee.phoneNumber || '',
      categoryId: employee.categoryId || '',
      squadId: employee.squadId || ''
    });
  };

  const generateConfirmationMessage = (actionText) => {
    if (!formData) return '';

    return `هل أنت متأكد من ${actionText} الموظف التالي؟
          - الاسم: ${formData.name}
          - المسمى الوظيفي: ${formData.jobTitle}
          - الرتبة: ${formData.rank}
          - رقم الهاتف: ${formData.phoneNumber}`;
  };

  const handleSubmit = () => {
    if (mode === 'edit' && selectedEmployee) {
      const newData = {...selectedEmployee, ...formData};
      mutate(newData);
    } else {
      mutate(formData);
    }
  };

  return {
    // State
    confirmationOpen,
    setConfirmationOpen,
    formData,
    selectedEmployee,
    
    // Handlers
    handleInputChange,
    handleEmployeeSelect,
    handleSubmit,
    
    // Utils
    generateConfirmationMessage,
    isPending
  };
};

export default useUserManager;
