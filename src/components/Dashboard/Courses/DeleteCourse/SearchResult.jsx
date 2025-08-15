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
  courses, 
  isLoading, 
  onDeleteCourse,
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

  if (hasSearched && courses.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={2} sx={{ borderRadius: 2, p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            لا توجد نتائج
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            لم يتم العثور على أي دورات مطابقة لكلمة البحث
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (courses.length === 0 && !isLoading) {
    return null;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {hasSearched ? `نتائج البحث (${courses.length} دورة)` : `جميع الدورات (${courses.length} دورة)`}
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
                  اسم الدورة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الفئة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  المشاركة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  العدد
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الجهة المنفذة
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
              {courses.map((course) => (
                <TableRow 
                  key={course.id} 
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
                    color: theme.palette.text.primary,
                    maxWidth: '200px'
                  }}>
                    {course.courseName}
                  </TableCell>
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {course.category}
                  </TableCell>
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {course.participants}
                  </TableCell>
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {course.count}
                  </TableCell>
                  <TableCell sx={{ 
                    color: theme.palette.text.primary 
                  }}>
                    {course.executingAuthority}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteCourse(course)}
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
