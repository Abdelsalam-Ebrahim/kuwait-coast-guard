import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const SearchResult = ({ 
  users, 
  isLoading, 
  hasSearched = false,
  editingUser, 
  onEditUser, 
  onCancelEdit, 
  onApplyEdit 
}) => {
  const theme = useTheme();
  const [editFormData, setEditFormData] = useState({});

  // Security level options
  const securityLevelOptions = [
    { value: 'level1', label: 'السرية الأولى' },
    { value: 'level2', label: 'السرية الثانية' },
    { value: 'level3', label: 'السرية الثالثة' }
  ];

  const getSecurityLevelLabel = (value) => {
    const option = securityLevelOptions.find(opt => opt.value === value);
    return option ? option.label : 'غير محدد';
  };

  const handleEditClick = (user) => {
    setEditFormData({
      name: user.name,
      jobTitle: user.jobTitle,
      rank: user.rank,
      category: user.category,
      phoneNumber: user.phoneNumber,
      securityLevel: user.securityLevel || 'level1' // Default to level1 if empty
    });
    onEditUser(user);
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyClick = (user) => {
    // Validate required fields (including security level)
    if (!editFormData.name || !editFormData.jobTitle || !editFormData.rank || 
        !editFormData.category || !editFormData.phoneNumber || !editFormData.securityLevel) {
      return;
    }
    onApplyEdit(user, editFormData);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (hasSearched && users.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={2} sx={{ borderRadius: 2, p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            لا توجد نتائج
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            لم يتم العثور على أي موظفين مطابقين لكلمة البحث
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (users.length === 0 && !isLoading) {
    return null;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {hasSearched ? `نتائج البحث (${users.length} موظف)` : `جميع الموظفين (${users.length} موظف)`}
          </Typography>
        </Box>
        
        <TableContainer>
          <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '8px 12px' } }}>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[50]
              }}>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الاسم
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  المسمى الوظيفي
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الرتبة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الفئة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  رقم الهاتف
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  السرية
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  padding: '12px 8px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الإجراءات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        size="small"
                        value={editFormData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        sx={{ minWidth: 100 }}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        size="small"
                        value={editFormData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        sx={{ minWidth: 100 }}
                      />
                    ) : (
                      user.jobTitle
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        size="small"
                        value={editFormData.rank}
                        onChange={(e) => handleInputChange('rank', e.target.value)}
                        sx={{ minWidth: 80 }}
                      />
                    ) : (
                      user.rank
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        size="small"
                        value={editFormData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        sx={{ minWidth: 60 }}
                      />
                    ) : (
                      user.category
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        size="small"
                        value={editFormData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        sx={{ minWidth: 100 }}
                      />
                    ) : (
                      user.phoneNumber
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <TextField
                        select
                        size="small"
                        value={editFormData.securityLevel || 'level1'}
                        onChange={(e) => handleInputChange('securityLevel', e.target.value)}
                        sx={{ minWidth: 110 }}
                      >
                        {securityLevelOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      getSecurityLevelLabel(user.securityLevel)
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    {editingUser === user.id ? (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApplyClick(user)}
                          sx={{ borderRadius: 1, fontSize: '0.75rem', padding: '4px 8px' }}
                        >
                          تطبيق
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<CloseIcon />}
                          onClick={onCancelEdit}
                          sx={{ borderRadius: 1, fontSize: '0.75rem', padding: '4px 8px' }}
                        >
                          إلغاء
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(user)}
                        sx={{ borderRadius: 1, fontSize: '0.75rem', padding: '4px 8px' }}
                      >
                        تعديل
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SearchResult;
