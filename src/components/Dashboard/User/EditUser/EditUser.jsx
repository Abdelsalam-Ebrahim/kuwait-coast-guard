import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchInput from '../../SearchInput';
import SearchResult from './SearchResult';
import ConfirmationModal from '../../ConfirmationModal';
import toast from 'react-hot-toast';


const EditUser = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    user: null,
    editedData: null
  });

  // Mock data for demonstration
  const mockUsers = [
    { id: 1, name: 'أحمد محمد', jobTitle: 'ضابط', rank: 'ملازم', category: 'أ', phoneNumber: '12345678', securityLevel: 'level1' },
    { id: 2, name: 'محمد علي', jobTitle: 'جندي', rank: 'عريف', category: 'ب', phoneNumber: '87654321', securityLevel: 'level2' },
    { id: 3, name: 'سارة أحمد', jobTitle: 'إداري', rank: 'موظف', category: 'ج', phoneNumber: '11223344', securityLevel: 'level3' },
    { id: 4, name: 'خالد سعد', jobTitle: 'فني', rank: 'رقيب', category: 'أ', phoneNumber: '55667788', securityLevel: 'level1' },
    { id: 5, name: 'فاطمة عبدالله', jobTitle: 'ضابط', rank: 'نقيب', category: 'أ', phoneNumber: '99887766', securityLevel: 'level2' }
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
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
      );
      setSearchResults(filteredUsers);
    }
    
    setIsSearchLoading(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleApplyEdit = (user, editedData) => {
    setConfirmationModal({
      open: true,
      user,
      editedData
    });
  };

  const handleConfirmEdit = async () => {
    setIsConfirmLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the user in search results
      setSearchResults(prev => prev.map(user => 
        user.id === confirmationModal.user.id 
          ? { ...user, ...confirmationModal.editedData }
          : user
      ));
      
      toast.success('تم تحديث بيانات الموظف بنجاح', {
        position: 'top-right',
        duration: 3000
      });
      
      setEditingUser(null);
      setConfirmationModal({ open: false, user: null, editedData: null });
    } catch (error) {
      toast.error('فشل في تحديث بيانات الموظف', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsConfirmLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, user: null, editedData: null });
  };

  return (
    <Box>
      <SearchInput onSearch={handleSearch} isShowAll={true} />
      <SearchResult 
        users={searchResults}
        isLoading={isSearchLoading}
        hasSearched={hasSearched}
        editingUser={editingUser}
        onEditUser={handleEditUser}
        onCancelEdit={handleCancelEdit}
        onApplyEdit={handleApplyEdit}
      />
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmEdit}
        title="تأكيد تعديل الموظف"
        message={confirmationModal.user ? `هل أنت متأكد من تعديل بيانات الموظف "${confirmationModal.user.name}"؟` : ''}
        confirmText="تأكيد التعديل"
        confirmColor="primary"
        isLoading={isConfirmLoading}
        showWarning={false}
        actionType="edit"
      />
    </Box>
  );
}

export default EditUser;
