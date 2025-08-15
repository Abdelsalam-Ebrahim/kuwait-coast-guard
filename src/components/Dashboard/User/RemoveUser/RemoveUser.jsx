import React, { useState, useEffect } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import toast from 'react-hot-toast';
import SearchInput from '../../SearchInput';
import SearchResult from './SearchResult';
import ConfirmationModal from '../../ConfirmationModal';

const RemoveUser = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Mock employee data - replace with actual API call
  const mockEmployees = [
    { id: 1, name: 'أحمد محمد علي', rank: 'نقيب', number: '12345' },
    { id: 2, name: 'فاطمة أحمد', rank: 'ملازم أول', number: '12346' },
    { id: 3, name: 'محمد سالم', rank: 'رقيب', number: '12347' },
    { id: 4, name: 'نورا عبدالله', rank: 'عريف', number: '12348' },
    { id: 5, name: 'علي حسن', rank: 'رائد', number: '12349' },
    { id: 6, name: 'سارة محمود', rank: 'ملازم', number: '12350' },
    { id: 7, name: 'خالد أحمد', rank: 'مقدم', number: '12351' },
    { id: 8, name: 'مريم سعد', rank: 'عقيد', number: '12352' }
  ];

  // Load all users on component mount
  useEffect(() => {
    const loadAllUsers = async () => {
      setIsSearchLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchResults(mockEmployees);
      setIsSearchLoading(false);
    };
    
    loadAllUsers();
  }, []);

  const handleSearch = async (searchTerm) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If search term is empty, show all users
    if (!searchTerm || searchTerm.trim() === '') {
      setSearchResults(mockEmployees);
    } else {
      // Filter employees based on search term
      const filteredEmployees = mockEmployees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.number.includes(searchTerm) ||
        employee.rank.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredEmployees);
    }
    
    setIsSearchLoading(false);
  };

  const handleDeleteClick = (employee) => {
    setUserToDelete(employee);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    
    // Simulate API call for deletion
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove user from search results
    setSearchResults(prev => prev.filter(user => user.id !== userToDelete.id));
    
    setIsDeleting(false);
    setDeleteConfirmOpen(false);
    
    toast.success(`تم حذف المستخدم "${userToDelete.name}" بنجاح`, {
      position: 'top-right',
      duration: 4000,
      style: {
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        fontSize: '14px',
        fontFamily: 'inherit'
      }
    });

    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      
      {/* Search Input */}
      <SearchInput onSearch={handleSearch} isShowAll={true} />

      {/* Search Results Component */}
      <SearchResult
        searchResults={searchResults}
        hasSearched={hasSearched}
        isLoading={isSearchLoading}
        onDeleteClick={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف المستخدم"
        message={`هل أنت متأكد من رغبتك في حذف المستخدم "${userToDelete?.name}" برتبة "${userToDelete?.rank}"؟`}
        confirmText="تأكيد الحذف"
        confirmColor="error"
        isLoading={isDeleting}
        showWarning={true}
        warningText="تحذير: هذا الإجراء لا يمكن التراجع عنه!"
      />
    </Box>
  );
};

export default RemoveUser;
