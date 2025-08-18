import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchInput from '../../Home/SearchInput';
import SearchResult from './SearchResult';
import ConfirmationModal from '../../Ui/ConfirmationModal';
import toast from 'react-hot-toast';

const DeleteAccount = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    user: null
  });

  // Mock data for demonstration
  const mockUsers = [
    { id: 1, username: 'ahmed.mohamed', rank: 'ملازم' },
    { id: 2, username: 'mohamed.ali', rank: 'عريف' },
    { id: 3, username: 'sara.ahmed', rank: 'موظف' },
    { id: 4, username: 'khalid.saad', rank: 'رقيب' },
    { id: 5, username: 'fatima.abdullah', rank: 'نقيب' }
  ];

  // Load all users on component mount
  useEffect(() => {
    const loadAllUsers = async () => {
      setIsSearchLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchResults(mockUsers);
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
      setSearchResults(mockUsers);
    } else {
      // Filter mock data based on search term
      const filteredUsers = mockUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rank.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
    
    setIsSearchLoading(false);
  };

  const handleDeleteUser = (user) => {
    setConfirmationModal({
      open: true,
      user
    });
  };

  const handleConfirmDelete = async () => {
    setIsDeleteLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove the user from search results
      setSearchResults(prev => prev.filter(user => user.id !== confirmationModal.user.id));
      
      // Close modal first
      setConfirmationModal({ open: false, user: null });
      
      // Show toast after a short delay
      setTimeout(() => {
        toast.success('تم حذف الحساب بنجاح', {
          position: 'top-right',
          duration: 3000
        });
      }, 100);
      
    } catch (error) {
      toast.error('فشل في حذف الحساب', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, user: null });
  };

  return (
    <Box>
      <SearchInput onSearch={handleSearch} isShowAll={true} />
      <SearchResult 
        users={searchResults}
        isLoading={isSearchLoading}
        onDeleteUser={handleDeleteUser}
        hasSearched={hasSearched}
      />
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        title="تأكيد حذف الحساب"
        message={confirmationModal.user ? `هل أنت متأكد من حذف حساب "${confirmationModal.user.username}"؟` : ''}
        confirmText="حذف الحساب"
        confirmColor="error"
        isLoading={isDeleteLoading}
        showWarning={true}
        actionType="delete"
      />
    </Box>
  );
}

export default DeleteAccount;
