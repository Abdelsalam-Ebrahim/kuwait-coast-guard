import { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import ConfirmationModal from '../Ui/ConfirmationModal';
import SearchInput from '../Home/SearchInput';
import EmployeeSearchResults from './Shared/EmployeeSearchResults';

// Import your HTTP functions here
import { deleteEmployee, getAllEmployees } from "../../../util/employeeHttp";
import { queryClient } from "../../../util/constants";

const RemoveUser = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Get all employees for search functionality
  const { data: employeeData } = useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) => getAllEmployees(signal),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('تم حذف الموظف بنجاح');
      setSelectedEmployee(null);
      setConfirmationOpen(false);
      // Remove from search results immediately for better UX
      setSearchResults(prev => prev.filter(emp => emp.id !== selectedEmployee?.id));
    },
    onError: () => {
      toast.error('حدث خطأ أثناء حذف الموظف');
      setConfirmationOpen(false);
    }
  });

  const handleSearchChange = async (searchTerm) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    
    if (!employeeData?.data) {
      setSearchResults([]);
      setIsSearchLoading(false);
      return;
    }

    // If search term is empty, show all employees
    if (!searchTerm || searchTerm.trim() === '') {
      toast.error('برجاء إدخال اسم الموظف');
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
      const filteredEmployees = employeeData.data.filter(employee =>  employee.name?.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(filteredEmployees);
    }
    
    setIsSearchLoading(false);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      mutate(selectedEmployee.id);
    }
  };

  const generateConfirmationMessage = () => {
    if (!selectedEmployee) return '';

    return `هل أنت متأكد من حذف الموظف التالي؟
          - الاسم: ${selectedEmployee.name}
          - المسمى الوظيفي: ${selectedEmployee.jobTitle}
          - الرتبة: ${selectedEmployee.rank}
          - رقم الهاتف: ${selectedEmployee.phoneNumber}
          
          تحذير: هذا الإجراء لا يمكن التراجع عنه!`;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Search Section */}
      <SearchInput onSearch={handleSearchChange} placeholder="ابحث بالاسم ..." />

      {/* Search Results */}
      <EmployeeSearchResults
        searchResults={searchResults}
        isSearchLoading={isSearchLoading}
        hasSearched={hasSearched}
        selectedEmployee={selectedEmployee}
        onEmployeeSelect={handleEmployeeSelect}
        mode="delete"
      />

      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => {
          setConfirmationOpen(false);
          setSelectedEmployee(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف الموظف"
        message={generateConfirmationMessage()}
        confirmText="تأكيد الحذف"
        confirmColor="error"
        isLoading={isPending}
        showWarning={true}
      />
    </Box>
  );
};

export default RemoveUser;
