import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchInput from '../../SearchInput';
import SearchResult from './SearchResult';
import ConfirmationModal from '../../ConfirmationModal';
import toast from 'react-hot-toast';

const EditCourse = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    course: null,
    editedData: null
  });

  // Mock data for demonstration
  const mockCourses = [
    { 
      id: 1, 
      courseName: 'دورة الإسعافات الأولية', 
      category: 'طبية', 
      participants: 'ضباط وضباط صف', 
      count: 25, 
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      duration: '15 يوم',
      notes: 'دورة مكثفة'
    },
    { 
      id: 2, 
      courseName: 'دورة القيادة البحرية', 
      category: 'بحرية', 
      participants: 'ضباط', 
      count: 15, 
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      duration: '4 أسابيع',
      notes: 'تدريب عملي'
    },
    { 
      id: 3, 
      courseName: 'دورة الأمن والسلامة', 
      category: 'أمنية', 
      participants: 'جميع الرتب', 
      count: 40, 
      startDate: '2024-03-01',
      endDate: '2024-03-10',
      duration: '10 أيام',
      notes: 'إلزامية لجميع المنتسبين'
    },
    { 
      id: 4, 
      courseName: 'دورة الحاسوب المتقدمة', 
      category: 'تقنية', 
      participants: 'موظفون مدنيون', 
      count: 20, 
      startDate: '2024-04-05',
      endDate: '2024-04-20',
      duration: '3 أسابيع',
      notes: 'متطلبات سابقة مطلوبة'
    },
    { 
      id: 5, 
      courseName: 'دورة اللغة الإنجليزية', 
      category: 'لغات', 
      participants: 'ضباط', 
      count: 30, 
      startDate: '2024-05-01',
      endDate: '2024-06-30',
      duration: '8 أسابيع',
      notes: 'دورة تأهيلية'
    }
  ];

  // Load all courses on component mount
  useEffect(() => {
    const loadAllCourses = async () => {
      setIsSearchLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSearchResults(mockCourses);
      setIsSearchLoading(false);
    };
    
    loadAllCourses();
  }, []);

  const handleSearch = async (searchTerm) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If search term is empty, show all courses
    if (!searchTerm || searchTerm.trim() === '') {
      setSearchResults(mockCourses);
    } else {
      // Filter mock data based on search term
      const filteredCourses = mockCourses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.participants.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCourses);
    }
    
    setIsSearchLoading(false);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course.id);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  const handleApplyEdit = (course, editedData) => {
    setConfirmationModal({
      open: true,
      course,
      editedData
    });
  };

  const handleConfirmEdit = async () => {
    setIsConfirmLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the course in search results
      setSearchResults(prev => prev.map(course => 
        course.id === confirmationModal.course.id 
          ? { ...course, ...confirmationModal.editedData }
          : course
      ));
      
      toast.success('تم تحديث بيانات الدورة بنجاح', {
        position: 'top-right',
        duration: 3000
      });
      
      setEditingCourse(null);
      setConfirmationModal({ open: false, course: null, editedData: null });
    } catch (error) {
      toast.error('فشل في تحديث بيانات الدورة', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsConfirmLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, course: null, editedData: null });
  };

  return (
    <Box>
      <SearchInput onSearch={handleSearch} isShowAll={true} />
      <SearchResult 
        courses={searchResults}
        isLoading={isSearchLoading}
        hasSearched={hasSearched}
        editingCourse={editingCourse}
        onEditCourse={handleEditCourse}
        onCancelEdit={handleCancelEdit}
        onApplyEdit={handleApplyEdit}
      />
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmEdit}
        title="تأكيد تعديل الدورة"
        message={confirmationModal.course ? `هل أنت متأكد من تعديل بيانات دورة "${confirmationModal.course.courseName}"؟` : ''}
        confirmText="تأكيد التعديل"
        confirmColor="primary"
        isLoading={isConfirmLoading}
        showWarning={false}
        actionType="edit"
      />
    </Box>
  );
}

export default EditCourse;
