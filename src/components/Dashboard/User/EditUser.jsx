import { useState } from 'react';
import { Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

import ConfirmationModal from '../Ui/ConfirmationModal';
import SearchInput from '../Home/SearchInput';
import UserFormBase from './Shared/UserFormBase';
import EmployeeSearchResults from './Shared/EmployeeSearchResults';
import useUserManager from './Shared/useUserManager';

// Import your HTTP functions here
import { editEmployee, getAllEmployees } from "../../../util/employeeHttp";
import toast from 'react-hot-toast';

const EditUser = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    confirmationOpen,
    setConfirmationOpen,
    formData,
    selectedEmployee,
    handleInputChange,
    handleEmployeeSelect,
    handleSubmit,
    generateConfirmationMessage,
    isPending
  } = useUserManager(
    editEmployee,
    'تم تحديث بيانات الموظف بنجاح',
    'حدث خطأ أثناء تحديث بيانات الموظف',
    'edit'
  );

  // Get all employees for search functionality
  const { data: employeeData } = useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) => getAllEmployees(signal),
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
      const filteredEmployees = employeeData.data.filter(employee => employee.name?.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(filteredEmployees);
    }
    
    setIsSearchLoading(false);
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
      />

      {/* Edit Form - only show if employee is selected */}
      {selectedEmployee && (
        <Box sx={{ mt: 3 }}>
          <UserFormBase
            formData={formData}
            onSubmit={() => setConfirmationOpen(true)}
            onChange={handleInputChange}
            title={`تعديل بيانات: ${selectedEmployee.name}`}
            icon={EditIcon}
            submitButtonText="تعديل بيانات الموظف"
            selectedEmployee={selectedEmployee}
          />
        </Box>
      )}

      <ConfirmationModal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleSubmit}
        title="تأكيد تعديل الموظف"
        message={generateConfirmationMessage('تعديل')}
        confirmText="تأكيد التعديل"
        confirmColor="primary"
        isLoading={isPending}
        showWarning={false}
      />
    </Box>
  );
};

export default EditUser;
