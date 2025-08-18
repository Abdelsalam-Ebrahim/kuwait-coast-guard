import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import ConfirmationModal from '../Ui/ConfirmationModal';
import toast, { Toaster } from 'react-hot-toast';

const EmailTable = ({ 
  title, 
  initialEmails = [], 
  onEmailsChange 
}) => {
  const theme = useTheme();
  
  // State for emails data
  const [emails, setEmails] = useState(initialEmails);

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // State for adding new email
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newEmailValue, setNewEmailValue] = useState('');
  
  // State for confirmation modal
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    emailId: null,
    email: ''
  });

  // State for save changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Update parent component when emails change
  const updateEmails = (newEmails) => {
    setEmails(newEmails);
    if (onEmailsChange) {
      onEmailsChange(newEmails);
    }
  };

  // Handle edit start
  const handleEditStart = (email) => {
    setEditingId(email.id);
    setEditValue(email.email);
  };

  // Handle edit save
  const handleEditSave = (id) => {
    if (!isValidEmail(editValue)) {
      toast.error('البريد الإلكتروني غير صحيح', {
        position: 'top-right',
        duration: 3000
      });
      return;
    }

    const updatedEmails = emails.map(email => 
      email.id === id ? { ...email, email: editValue } : email
    );
    
    updateEmails(updatedEmails);
    setEditingId(null);
    setEditValue('');
    setHasUnsavedChanges(true);
    
    toast.success('تم تعديل البريد الإلكتروني', {
      position: 'top-right',
      duration: 3000
    });
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  // Handle delete
  const handleDeleteClick = (email) => {
    setConfirmationModal({
      open: true,
      emailId: email.id,
      email: email.email
    });
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedEmails = emails.filter(email => email.id !== confirmationModal.emailId);
      updateEmails(updatedEmails);
      setHasUnsavedChanges(true);
      
      setConfirmationModal({ open: false, emailId: null, email: '' });
      
      setTimeout(() => {
        toast.success('تم حذف البريد الإلكتروني بنجاح', {
          position: 'top-right',
          duration: 3000
        });
      }, 100);
      
    } catch (error) {
      toast.error('فشل في حذف البريد الإلكتروني', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add new email
  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewEmailValue('');
  };

  const handleAddSave = () => {
    if (!isValidEmail(newEmailValue)) {
      toast.error('البريد الإلكتروني غير صحيح', {
        position: 'top-right',
        duration: 3000
      });
      return;
    }

    // Check for duplicate emails
    if (emails.some(email => email.email === newEmailValue)) {
      toast.error('هذا البريد الإلكتروني موجود بالفعل', {
        position: 'top-right',
        duration: 3000
      });
      return;
    }

    const newEmail = {
      id: emails.length > 0 ? Math.max(...emails.map(e => e.id)) + 1 : 1,
      email: newEmailValue
    };

    const updatedEmails = [...emails, newEmail];
    updateEmails(updatedEmails);
    setIsAddingNew(false);
    setNewEmailValue('');
    setHasUnsavedChanges(true);
    
    toast.success('تم إضافة البريد الإلكتروني', {
      position: 'top-right',
      duration: 3000
    });
  };

  const handleAddCancel = () => {
    setIsAddingNew(false);
    setNewEmailValue('');
  };

  // Handle save all changes
  const handleSaveChanges = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasUnsavedChanges(false);
      
      toast.success('تم حفظ جميع التغييرات بنجاح', {
        position: 'top-right',
        duration: 3000
      });
      
    } catch (error) {
      toast.error('فشل في حفظ التغييرات', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1000, mx: 'auto' }}>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            disabled={isAddingNew || editingId !== null}
            sx={{ borderRadius: 2 }}
          >
            إضافة بريد جديد
          </Button>
          
          {hasUnsavedChanges && (
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              disabled={isLoading || editingId !== null || isAddingNew}
              sx={{ borderRadius: 2 }}
            >
              حفظ التغييرات
            </Button>
          )}
        </Box>
      </Box>

      {/* Table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[50]
              }}>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  البريد الإلكتروني
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الإجراءات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map((email) => (
                <TableRow 
                  key={email.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[800] 
                        : theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {editingId === email.id ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? theme.palette.grey[700] 
                              : theme.palette.background.paper,
                          }
                        }}
                      />
                    ) : (
                      email.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === email.id ? (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => handleEditSave(email.id)}
                          sx={{ borderRadius: 1 }}
                        >
                          حفظ
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<CloseIcon />}
                          onClick={handleEditCancel}
                          sx={{ borderRadius: 1 }}
                        >
                          إلغاء
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditStart(email)}
                          disabled={editingId !== null || isAddingNew}
                          sx={{ borderRadius: 1 }}
                        >
                          تعديل
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteClick(email)}
                          disabled={editingId !== null || isAddingNew}
                          sx={{ borderRadius: 1 }}
                        >
                          حذف
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Add new email row */}
              {isAddingNew && (
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={newEmailValue}
                      onChange={(e) => setNewEmailValue(e.target.value)}
                      placeholder="أدخل البريد الإلكتروني الجديد"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? theme.palette.grey[700] 
                            : theme.palette.background.paper,
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={handleAddSave}
                        sx={{ borderRadius: 1 }}
                      >
                        إضافة
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={handleAddCancel}
                        sx={{ borderRadius: 1 }}
                      >
                        إلغاء
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={() => setConfirmationModal({ open: false, emailId: null, email: '' })}
        onConfirm={handleConfirmDelete}
        title="تأكيد حذف البريد الإلكتروني"
        message={`هل أنت متأكد من حذف البريد الإلكتروني "${confirmationModal.email}"؟`}
        confirmText="تأكيد الحذف"
        confirmColor="error"
        isLoading={isLoading}
        showWarning={true}
        actionType="delete"
      />
    </Box>
  );
};

export default EmailTable;
