import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Search from '../../components/Website/PublicRegister/Search';
import SearchResult from '../../components/Website/PublicRegister/SearchResult';

const PublicRegister = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for all three groups - in a real app, this would come from an API
  const getAllGroupsData = () => {
    return [
      // First Group (السرية الأولى) - Operations
      {
        id: 1, groupId: 1, rank: "قائد زورق", jobTitle: "ملازم اول", 
        fullName: "فهد سالم فرج السعد", distribution: "10", phone: "50000001",
        workDays: [
          { dayOfWeek: "الأحد", date: "2025-01-05", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الاثنين", date: "2025-01-06", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الثلاثاء", date: "2025-01-07", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الأربعاء", date: "2025-01-08", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الخميس", date: "2025-01-09", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الجمعة", date: "2025-01-10", placeOfReceipt: "الكويت" }
        ]
      },
      {
        id: 2, groupId: 1, rank: "قائد زورق", jobTitle: "ملازم اول", 
        fullName: "فهد حمد العجمي", distribution: "20", phone: "50000002",
        workDays: [
          { dayOfWeek: "السبت", date: "2025-01-04", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الأحد", date: "2025-01-05", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الاثنين", date: "2025-01-06", placeOfReceipt: "الجبريه" }
        ]
      },
      {
        id: 3, groupId: 1, rank: "نوخذه", jobTitle: "وكيل اول ضابط", 
        fullName: "حسين يونس عباس حسين دشتي", distribution: "30", phone: "50000003",
        workDays: [
          { dayOfWeek: "السبت", date: "2025-01-11", placeOfReceipt: "الكويت" },
          { dayOfWeek: "الأحد", date: "2025-01-12", placeOfReceipt: "الجبريه" }
        ]
      },
      {
        id: 4, groupId: 1, rank: "بحار", jobTitle: "وكيل ضابط", 
        fullName: "محمد حيدر محمد علي حيدر", distribution: "420", phone: "50000005",
        workDays: [
          { dayOfWeek: "الثلاثاء", date: "2025-01-07", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الأربعاء", date: "2025-01-08", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الخميس", date: "2025-01-09", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الجمعة", date: "2025-01-10", placeOfReceipt: "الكويت" }
        ]
      },

      // Second Group (السرية الثانية) - Audience
      {
        id: 5, groupId: 2, rank: "رئيس رقباء", jobTitle: "رئيس رقباء", 
        fullName: "أحمد محمد السالم", distribution: "15", phone: "50000010",
        workDays: [
          { dayOfWeek: "السبت", date: "2025-01-04", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الأحد", date: "2025-01-05", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الاثنين", date: "2025-01-06", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الثلاثاء", date: "2025-01-07", placeOfReceipt: "الكويت" },
          { dayOfWeek: "الأربعاء", date: "2025-01-08", placeOfReceipt: "الجبريه" }
        ]
      },
      {
        id: 6, groupId: 2, rank: "رقيب", jobTitle: "رقيب", 
        fullName: "محمد علي أحمد", distribution: "25", phone: "50000011",
        workDays: [
          { dayOfWeek: "الخميس", date: "2025-01-09", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الجمعة", date: "2025-01-10", placeOfReceipt: "القاعده" },
          { dayOfWeek: "السبت", date: "2025-01-11", placeOfReceipt: "الجبريه" }
        ]
      },

      // Third Group (السرية الثالثة) - Distribution
      {
        id: 7, groupId: 3, rank: "عريف", jobTitle: "عريف", 
        fullName: "علي أحمد محمد السعد", distribution: "35", phone: "50000020",
        workDays: [
          { dayOfWeek: "الأحد", date: "2025-01-12", placeOfReceipt: "الكويت" },
          { dayOfWeek: "الاثنين", date: "2025-01-13", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الثلاثاء", date: "2025-01-14", placeOfReceipt: "الاحمديه" },
          { dayOfWeek: "الأربعاء", date: "2025-01-15", placeOfReceipt: "القاعده" }
        ]
      },
      {
        id: 8, groupId: 3, rank: "جندي أول", jobTitle: "جندي أول", 
        fullName: "سالم فهد العجمي", distribution: "420", phone: "50000021",
        workDays: [
          { dayOfWeek: "الخميس", date: "2025-01-16", placeOfReceipt: "الجبريه" },
          { dayOfWeek: "الجمعة", date: "2025-01-17", placeOfReceipt: "الاحمديه" }
        ]
      },
      {
        id: 9, groupId: 3, rank: "جندي", jobTitle: "جندي", 
        fullName: "فهد السالم أحمد", distribution: "45", phone: "50000022",
        workDays: [
          { dayOfWeek: "السبت", date: "2025-01-18", placeOfReceipt: "القاعده" },
          { dayOfWeek: "الأحد", date: "2025-01-19", placeOfReceipt: "الكويت" },
          { dayOfWeek: "الاثنين", date: "2025-01-20", placeOfReceipt: "الجبريه" }
        ]
      }
    ];
  };

  const handleSearch = (criteria) => {
    const searchTerm = criteria.searchTerm?.trim() || '';
    
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const allData = getAllGroupsData();
      
      let filtered = allData.filter(employee => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        // Search in employee name
        const nameMatch = employee.fullName.toLowerCase().includes(lowerSearchTerm);
        
        // Search in distribution number
        const distributionMatch = employee.distribution && employee.distribution.toLowerCase().includes(lowerSearchTerm);
        
        // Search in coast guard ID (if available)
        const coastGuardIdMatch = employee.coastGuardId && employee.coastGuardId.toLowerCase().includes(lowerSearchTerm);
        
        return nameMatch || distributionMatch || coastGuardIdMatch;
      });

      setSearchResults(filtered);
      setIsLoading(false);
    }, 500); // Reduced delay for button-triggered search
  };

  const handleClear = () => {
    setSearchResults([]);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 2 }}>
      <Search 
        onSearch={handleSearch} 
        onClear={handleClear}
        searchResults={searchResults}
      />
      <SearchResult 
        searchResults={searchResults}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default PublicRegister;
