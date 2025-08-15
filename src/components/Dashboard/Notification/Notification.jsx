import React, { useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import toast from 'react-hot-toast';
import SearchInput from '../SearchInput';
import SearchResult from './SearchResult';
import NotificaitonText from './NotificaitonText';

const Notification = () => {
  const theme = useTheme();
  
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showNotificationOnly, setShowNotificationOnly] = useState(false);

  // Mock user data - replace with actual API call
  const mockUsers = [
    { id: 1, name: 'أحمد محمد علي', number: '12345' },
    { id: 2, name: 'فاطمة أحمد', number: '12346' },
    { id: 3, name: 'محمد سالم', number: '12347' },
    { id: 4, name: 'نورا عبدالله', number: '12348' },
    { id: 5, name: 'علي حسن', number: '12349' },
    { id: 6, name: 'سارة محمود', number: '12350' },
    { id: 7, name: 'خالد أحمد', number: '12351' },
    { id: 8, name: 'مريم سعد', number: '12352' }
  ];

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      toast.error('يرجى إدخال كلمة البحث', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });
      return;
    }

    setHasSearched(false);
    setShowNotificationOnly(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter users based on search term
    const filteredUsers = mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.number.includes(searchTerm)
    );
    
    setSearchResults(filteredUsers);
    setSelectedUsers([]);
    setHasSearched(true);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === searchResults.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(searchResults.map(user => user.id));
    }
  };

  const handleSendNotification = async () => {
    if (selectedUsers.length === 0) {
      toast.error('يرجى اختيار مستخدم واحد على الأقل', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });
      return;
    }

    if (!notificationMessage.trim()) {
      toast.error('يرجى إدخال نص الإشعار', {
        position: 'top-right',
        duration: 3000,
        style: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          fontSize: '14px',
          fontFamily: 'inherit'
        }
      });
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get selected user names from either search results or all users
    const usersToNotify = showNotificationOnly 
      ? mockUsers.filter(user => selectedUsers.includes(user.id))
      : searchResults.filter(user => selectedUsers.includes(user.id));

    setIsSending(false);
    
    toast.success(`تم إرسال الإشعار بنجاح إلى ${selectedUsers.length} مستخدم`, {
      position: 'top-right',
      duration: 4000,
      style: {
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        fontSize: '14px',
        fontFamily: 'inherit'
      }
    });

    // Reset form
    setNotificationMessage('');
    setSelectedUsers([]);
    setShowNotificationOnly(false);
    setHasSearched(false);
  };

  const handleSelectAllEmployees = () => {
    // Select all employees from mockUsers
    const allUserIds = mockUsers.map(user => user.id);
    setSelectedUsers(allUserIds);
    setShowNotificationOnly(true);
    setHasSearched(false); // Hide search results
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Search Input Component */}
      <SearchInput
        isSelectAll={true} 
        onSearch={handleSearch}
        onSelectAll={handleSelectAllEmployees}
      />

      {/* Search Results Component */}
      <SearchResult
        searchResults={searchResults}
        selectedUsers={selectedUsers}
        onUserSelect={handleUserSelect}
        onSelectAll={handleSelectAll}
        hasSearched={hasSearched && !showNotificationOnly}
      />

      {/* Notification Text Component */}
      <NotificaitonText
        selectedUsers={selectedUsers}
        notificationMessage={notificationMessage}
        onMessageChange={(e) => setNotificationMessage(e.target.value)}
        onSendNotification={handleSendNotification}
        isSending={isSending}
        showComponent={((hasSearched && searchResults.length > 0) || showNotificationOnly)}
      />
    </Box>
  );
};

export default Notification;
