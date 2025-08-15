import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';

const ConfirmationModal = ({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  confirmColor = "error",
  isLoading = false,
  showWarning = true,
  warningText = "تحذير: هذا الإجراء لا يمكن التراجع عنه!",
  actionType = "delete" // "delete", "edit", or "create"
}) => {
  const getActionIcon = () => {
    if (isLoading) return <CircularProgress size={16} color="inherit" />;
    if (actionType === "edit") return <EditIcon />;
    if (actionType === "create") return <PersonAddIcon />;
    return <DeleteIcon />;
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 600, color: `${confirmColor}.main` }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {message}
          <br />
          <br />
          {showWarning && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {warningText}
            </Alert>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          إلغاء
        </Button>
        <Button 
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          disabled={isLoading}
          startIcon={getActionIcon()}
          sx={{ borderRadius: 2 }}
        >
          {isLoading ? 'جاري التنفيذ...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
