import React from 'react';
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
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const SearchResult = ({ 
  searchResults, 
  hasSearched, 
  isLoading,
  onDeleteClick 
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (hasSearched && searchResults.length === 0) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          mt: 3,
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            لا توجد نتائج
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            لم يتم العثور على أي موظفين مطابقين لكلمة البحث
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (searchResults.length === 0 && !isLoading) {
    return null;
  }

  return (
    <Paper
      elevation={2}
      sx={{ 
        mt: 3,
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        mx: { xs: 2, sm: 3 }
      }}
    >
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.default'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <PersonIcon color="primary" />
          {hasSearched ? `نتائج البحث (${searchResults.length})` : `جميع الموظفين (${searchResults.length})`}
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              bgcolor: theme.palette.mode === 'dark' 
                ? 'grey.800' 
                : 'grey.50'
            }}>
              <TableCell 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: 2,
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}
              >
                  الاسم
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: 2,
                    color: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[100] 
                      : theme.palette.text.primary
                  }}
                >
                  الرتبة
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: 2,
                    color: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[100] 
                      : theme.palette.text.primary
                  }}
                >
                  الإجراءات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((employee) => (
                <TableRow 
                  key={employee.id}
                  sx={{ 
                    '&:hover': { 
                      bgcolor: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[800] 
                        : theme.palette.action.hover
                    },
                    '&:last-child td, &:last-child th': { 
                      border: 0 
                    }
                  }}
                >
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      py: 2,
                      color: theme.palette.text.primary
                    }}
                  >
                    {employee.name}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      py: 2,
                      color: 'primary.main',
                      fontWeight: 500
                    }}
                  >
                    {employee.rank}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteClick(employee)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        px: { xs: 1.5, sm: 2 },
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
  );
};

export default SearchResult;
