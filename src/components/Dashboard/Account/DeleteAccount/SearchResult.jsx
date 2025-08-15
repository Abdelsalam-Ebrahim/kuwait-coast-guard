import React from 'react';
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
  Typography,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon
} from '@mui/icons-material';

const SearchResult = ({ 
  users, 
  isLoading, 
  onDeleteUser,
  hasSearched = false 
}) => {
  const theme = useTheme();

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
            لم يتم العثور على أي حسابات مطابقة لكلمة البحث
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
            {hasSearched ? `نتائج البحث (${users.length} حساب)` : `جميع الحسابات (${users.length} حساب)`}
          </Typography>
        </Box>
        
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
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  اسم المستخدم
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الرتبة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
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
                <TableRow 
                  key={user.id} 
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[800] 
                        : theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {user.username}
                  </TableCell>
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {user.rank}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteUser(user)}
                      sx={{ 
                        borderRadius: 1,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? theme.palette.error.dark 
                          : theme.palette.error.main,
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? theme.palette.error.light 
                            : theme.palette.error.dark
                        }
                      }}
                    >
                      حذف
                    </Button>
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
