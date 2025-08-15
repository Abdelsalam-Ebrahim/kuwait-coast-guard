import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import ConfirmationModal from '../../ConfirmationModal';
import EditAccountForm from './EditAccountForm';
import SearchInput from '../../SearchInput';
import SearchResult from './SearchResult';
import toast from 'react-hot-toast';

const EditAccount = () => {
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    user: null,
    editedData: null
  });

  // Mock data for demonstration
  const mockAccounts = [
    { 
      id: 1, 
      username: 'ahmed.mohamed', 
      password: 'password123',
      permissions: {
        printing: true,
        audience: false,
        distribution: true,
        operations: false,
        crews: true,
        outsiders: false,
        archive: false,
        secretLevel1: true,
        secretLevel2: false,
        secretLevel3: false,
        sendNotification: true,
        accessDashboard: true
      }
    },
    { 
      id: 2, 
      username: 'mohamed.ali', 
      password: 'mypass456',
      permissions: {
        printing: false,
        audience: true,
        distribution: false,
        operations: true,
        crews: false,
        outsiders: true,
        archive: true,
        secretLevel1: false,
        secretLevel2: true,
        secretLevel3: false,
        sendNotification: false,
        accessDashboard: true
      }
    },
    { 
      id: 3, 
      username: 'sara.ahmed', 
      password: 'secure789',
      permissions: {
        printing: true,
        audience: true,
        distribution: true,
        operations: true,
        crews: true,
        outsiders: true,
        archive: true,
        secretLevel1: true,
        secretLevel2: true,
        secretLevel3: true,
        sendNotification: true,
        accessDashboard: true
      }
    }
  ];

  // Load all users on component mount
  useEffect(() => {
    const loadAllUsers = async () => {
      setIsSearchLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchResults(mockAccounts);
      setIsSearchLoading(false);
    };
    
    loadAllUsers();
  }, []);

  const handleSearch = async (searchTerm) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    setShowEditForm(false);
    setEditingUser(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If search term is empty, show all users
    if (!searchTerm || searchTerm.trim() === '') {
      setSearchResults(mockAccounts);
    } else {
      // Filter mock data based on username
      const filteredAccounts = mockAccounts.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredAccounts);
    }
    
    setIsSearchLoading(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setShowEditForm(false);
  };

  const handleSaveChanges = (editedData) => {
    setConfirmationModal({
      open: true,
      user: editingUser,
      editedData
    });
  };

  const handleConfirmEdit = async () => {
    setIsEditLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the user in search results
      setSearchResults(prev => prev.map(user => 
        user.id === confirmationModal.user.id 
          ? { ...user, ...confirmationModal.editedData }
          : user
      ));
      
      // Close modal and form first
      setConfirmationModal({ open: false, user: null, editedData: null });
      setShowEditForm(false);
      setEditingUser(null);
      
      // Show toast after a short delay
      setTimeout(() => {
        toast.success('تم تحديث بيانات الحساب بنجاح', {
          position: 'top-right',
          duration: 3000
        });
      }, 100);
      
    } catch (error) {
      toast.error('فشل في تحديث بيانات الحساب', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, user: null, editedData: null });
  };

  const generateConfirmationMessage = () => {
    if (!confirmationModal.user || !confirmationModal.editedData) return '';
    
    const selectedPermissions = Object.entries(confirmationModal.editedData.permissions)
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
    
    return `هل أنت متأكد من تحديث بيانات حساب "${confirmationModal.user.username}"؟

كلمة المرور الجديدة: ${'*'.repeat(confirmationModal.editedData.password.length)}

الصلاحيات المحددة:
${selectedPermissions.length > 0 ? selectedPermissions.join(' - ') : 'لا توجد صلاحيات محددة'}`;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <SearchInput onSearch={handleSearch} isShowAll={true} />
      <SearchResult 
        users={searchResults}
        isLoading={isSearchLoading}
        hasSearched={hasSearched}
        onEditUser={handleEditUser}
      />
      
      {showEditForm && editingUser && (
        <EditAccountForm 
          userData={editingUser}
          onSave={handleSaveChanges}
          onCancel={handleCancelEdit}
        />
      )}
      
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmEdit}
        title="تأكيد تحديث الحساب"
        message={generateConfirmationMessage()}
        confirmText="تأكيد التحديث"
        confirmColor="primary"
        isLoading={isEditLoading}
        showWarning={false}
        actionType="edit"
      />
    </Box>
  );
};

export default EditAccount;
