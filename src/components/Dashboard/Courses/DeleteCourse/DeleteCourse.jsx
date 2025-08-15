import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchInput from '../../SearchInput';
import SearchResult from './SearchResult';
import ConfirmationModal from '../../ConfirmationModal';
import toast from 'react-hot-toast';

const DeleteCourse = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true); // Start as true since we load on mount
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    course: null
  });

  // Mock data for demonstration
  const mockCourses = [
    { 
      id: 1, 
      courseName: 'دورة الإسعافات الأولية', 
      category: 'طبية', 
      participants: 'ضباط وضباط صف', 
      count: 25, 
      executingAuthority: 'الإدارة الطبية' 
    },
    { 
      id: 2, 
      courseName: 'دورة القيادة البحرية', 
      category: 'بحرية', 
      participants: 'ضباط', 
      count: 15, 
      executingAuthority: 'الإدارة البحرية' 
    },
    { 
      id: 3, 
      courseName: 'دورة الأمن والسلامة', 
      category: 'أمنية', 
      participants: 'جميع الرتب', 
      count: 40, 
      executingAuthority: 'إدارة الأمن' 
    },
    { 
      id: 4, 
      courseName: 'دورة الحاسوب المتقدمة', 
      category: 'تقنية', 
      participants: 'موظفون مدنيون', 
      count: 20, 
      executingAuthority: 'إدارة تقنية المعلومات' 
    },
    { 
      id: 5, 
      courseName: 'دورة اللغة الإنجليزية', 
      category: 'لغات', 
      participants: 'ضباط', 
      count: 30, 
      executingAuthority: 'معهد اللغات' 
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
        course.executingAuthority.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCourses);
    }
    
    setIsSearchLoading(false);
  };

  const handleDeleteCourse = (course) => {
    setConfirmationModal({
      open: true,
      course
    });
  };

  const handleConfirmDelete = async () => {
    setIsDeleteLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove the course from search results
      setSearchResults(prev => prev.filter(course => course.id !== confirmationModal.course.id));
      
      // Close modal first
      setConfirmationModal({ open: false, course: null });
      
      // Show toast after a short delay
      setTimeout(() => {
        toast.success('تم حذف الدورة بنجاح', {
          position: 'top-right',
          duration: 3000
        });
      }, 100);
      
    } catch (error) {
      toast.error('فشل في حذف الدورة', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, course: null });
  };

  return (
    <Box>
      <SearchInput onSearch={handleSearch} isShowAll={true} />
      <SearchResult 
        courses={searchResults}
        isLoading={isSearchLoading}
        onDeleteCourse={handleDeleteCourse}
        hasSearched={hasSearched}
      />
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        title="تأكيد حذف الدورة"
        message={confirmationModal.course ? `هل أنت متأكد من حذف دورة "${confirmationModal.course.courseName}"؟` : ''}
        confirmText="حذف الدورة"
        confirmColor="error"
        isLoading={isDeleteLoading}
        showWarning={true}
        actionType="delete"
      />
    </Box>
  );
}

export default DeleteCourse;
