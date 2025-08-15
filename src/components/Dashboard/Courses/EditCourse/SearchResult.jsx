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
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const SearchResult = ({ 
  courses, 
  isLoading, 
  hasSearched = false,
  editingCourse, 
  onEditCourse, 
  onCancelEdit, 
  onApplyEdit 
}) => {
  const theme = useTheme();
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (course) => {
    setEditFormData({
      courseName: course.courseName,
      category: course.category,
      participants: course.participants,
      count: course.count,
      startDate: course.startDate,
      endDate: course.endDate,
      duration: course.duration,
      notes: course.notes
    });
    onEditCourse(course);
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyClick = (course) => {
    // Validate required fields
    if (!editFormData.courseName || !editFormData.category || !editFormData.participants || 
        !editFormData.count || !editFormData.startDate || !editFormData.endDate || 
        !editFormData.duration || !editFormData.notes) {
      return;
    }
    onApplyEdit(course, editFormData);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (hasSearched && courses.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
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
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {hasSearched ? `نتائج البحث (${courses.length} دورة)` : `جميع الدورات (${courses.length} دورة)`}
          </Typography>
        </Box>
        
        <TableContainer>
          <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '8px 6px' } }}>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[50]
              }}>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  اسم الدورة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  الفئة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  المشاركة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  العدد
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  بداية الدورة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  نهاية الدورة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  المدة
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.text.primary
                }}>
                  ملاحظات
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  padding: '12px 6px',
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
                <TableRow key={course.id} hover>
                  <TableCell sx={{ padding: '6px', minWidth: '150px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        value={editFormData.courseName}
                        onChange={(e) => handleInputChange('courseName', e.target.value)}
                        sx={{ minWidth: 140 }}
                        multiline
                        maxRows={2}
                      />
                    ) : (
                      course.courseName
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        value={editFormData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        sx={{ minWidth: 80 }}
                      />
                    ) : (
                      course.category
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px', minWidth: '120px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        value={editFormData.participants}
                        onChange={(e) => handleInputChange('participants', e.target.value)}
                        sx={{ minWidth: 110 }}
                        multiline
                        maxRows={2}
                      />
                    ) : (
                      course.participants
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        type="number"
                        value={editFormData.count}
                        onChange={(e) => handleInputChange('count', parseInt(e.target.value))}
                        sx={{ minWidth: 70 }}
                      />
                    ) : (
                      course.count
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        type="date"
                        value={editFormData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        sx={{ minWidth: 120 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    ) : (
                      course.startDate
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        type="date"
                        value={editFormData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        sx={{ minWidth: 120 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    ) : (
                      course.endDate
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        value={editFormData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        sx={{ minWidth: 80 }}
                      />
                    ) : (
                      course.duration
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px', minWidth: '150px' }}>
                    {editingCourse === course.id ? (
                      <TextField
                        size="small"
                        value={editFormData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        sx={{ minWidth: 140 }}
                        multiline
                        maxRows={3}
                      />
                    ) : (
                      course.notes
                    )}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }}>
                    {editingCourse === course.id ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApplyClick(course)}
                          sx={{ borderRadius: 1, fontSize: '0.7rem', padding: '2px 6px', mb: 0.5 }}
                        >
                          تطبيق
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<CloseIcon />}
                          onClick={onCancelEdit}
                          sx={{ borderRadius: 1, fontSize: '0.7rem', padding: '2px 6px' }}
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
                        onClick={() => handleEditClick(course)}
                        sx={{ borderRadius: 1, fontSize: '0.7rem', padding: '4px 8px' }}
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
