import React, { useEffect } from 'react';
import { 
  Paper, 
  Box,
} from '@mui/material';
import DistributionTables from './DistributionTables';
import SystemHeader from '../../Ui/SystemHeader';
import printCrews from './PrintCrews';

const Crews = ({ employees, onNavigateAway }) => {
  // Clear any existing navigation handlers when this component mounts
  useEffect(() => {
    if (onNavigateAway) {
      onNavigateAway(null);
    }
  }, [onNavigateAway]);

  const firstDistribution = [
    {
      name: "أحمد محمد",
      jobTitle: "قائد زورق",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 25, present: 20, missing: 5 },
        { title: "نواخذه", total: 15, present: 12, missing: 3 },
        { title: "بحرية", total: 40, present: 35, missing: 5 },
        { title: "مدني فني", total: 5, present: 4, missing: 1 },
        { title: "مهني فني", total: 18, present: 15, missing: 3 },
        { title: "مهني طباخ", total: 10, present: 8, missing: 2 },
        { title: "الجيش البنغالي فني", total: 12, present: 9, missing: 3 },
        { title: "الجيش البنغالي طباخ", total: 3, present: 2, missing: 1 },
      ]
    },
    {
      name: "محمد علي",
      jobTitle: "نوخذه",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 22, present: 18, missing: 4 },
        { title: "نواخذه", total: 14, present: 11, missing: 3 },
        { title: "بحرية", total: 38, present: 38, missing: 0 },
        { title: "مدني فني", total: 4, present: 3, missing: 1 },
        { title: "مهني فني", total: 16, present: 14, missing: 2 },
        { title: "مهني طباخ", total: 8, present: 7, missing: 1 },
        { title: "الجيش البنغالي فني", total: 10, present: 8, missing: 2 },
        { title: "الجيش البنغالي طباخ", total: 2, present: 1, missing: 1 },
      ]
    }
  ];

  // بيانات التوزيع الثاني
  const secondDistribution = [
    {
      name: "سعيد حسن",
      jobTitle: "بحار",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 28, present: 24, missing: 4 },
        { title: "نواخذه", total: 17, present: 14, missing: 3 },
        { title: "بحرية", total: 45, present: 44, missing: 1 },
        { title: "مدني فني", total: 6, present: 5, missing: 1 },
        { title: "مهني فني", total: 20, present: 17, missing: 3 },
        { title: "مهني طباخ", total: 12, present: 9, missing: 3 },
        { title: "الجيش البنغالي فني", total: 15, present: 12, missing: 3 },
        { title: "الجيش البنغالي طباخ", total: 4, present: 3, missing: 1 },
      ]
    },
    {
      name: "جمال فهد",
      jobTitle: "كهرباء",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 26, present: 23, missing: 3 },
        { title: "نواخذه", total: 16, present: 12, missing: 4 },
        { title: "بحرية", total: 42, present: 40, missing: 2 },
        { title: "مدني فني", total: 4, present: 4, missing: 0 },
        { title: "مهني فني", total: 15, present: 14, missing: 1 },
        { title: "مهني طباخ", total: 10, present: 9, missing: 1 },
        { title: "الجيش البنغالي فني", total: 12, present: 10, missing: 2 },
        { title: "الجيش البنغالي طباخ", total: 3, present: 3, missing: 0 },
      ]
    }
  ];

  // بيانات التوزيع الثالث
  const thirdDistribution = [
    {
      name: "خالد عبدالعزيز",
      jobTitle: "طباخ",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 20, present: 18, missing: 2 },
        { title: "نواخذه", total: 10, present: 9, missing: 1 },
        { title: "بحرية", total: 35, present: 33, missing: 2 },
        { title: "مدني فني", total: 2, present: 2, missing: 0 },
        { title: "مهني فني", total: 8, present: 7, missing: 1 },
        { title: "مهني طباخ", total: 15, present: 12, missing: 3 },
        { title: "الجيش البنغالي فني", total: 9, present: 8, missing: 1 },
        { title: "الجيش البنغالي طباخ", total: 2, present: 2, missing: 0 },
      ]
    },
    {
      name: "ناصر يوسف",
      jobTitle: "ميكانيك",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 19, present: 17, missing: 2 },
        { title: "نواخذه", total: 9, present: 8, missing: 1 },
        { title: "بحرية", total: 30, present: 30, missing: 0 },
        { title: "مدني فني", total: 3, present: 3, missing: 0 },
        { title: "مهني فني", total: 7, present: 7, missing: 0 },
        { title: "مهني طباخ", total: 14, present: 12, missing: 2 },
        { title: "الجيش البنغالي فني", total: 10, present: 9, missing: 1 },
        { title: "الجيش البنغالي طباخ", total: 1, present: 1, missing: 0 },
      ]
    }
  ];

  // بيانات التوزيع الرابع
  const fourthDistribution = [
    {
      name: "علي محمد علي",
      jobTitle: "قائد زورق",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 30, present: 25, missing: 5 },
        { title: "نواخذه", total: 20, present: 10, missing: 10 },
        { title: "بحرية", total: 30, present: 30, missing: 0 },
        { title: "مدني فني", total: 3, present: 2, missing: 1 },
        { title: "مهني فني", total: 12, present: 5, missing: 7 },
        { title: "مهني طباخ", total: 26, present: 12, missing: 14 },
        { title: "الجيس البنغالي فني", total: 23, present: 11, missing: 12 },
        { title: "الجيش البنغالي طباخ", total: 2, present: 0, missing: 2 },
      ]
    },
    {
      name: "فهد سالم",
      jobTitle: "نوخذه",
      rank: "ملازم أول",
      statistics: [
        { title: "ضباط", total: 30, present: 25, missing: 5 },
        { title: "نواخذه", total: 20, present: 10, missing: 10 },
        { title: "بحرية", total: 30, present: 30, missing: 0 },
        { title: "مدني فني", total: 3, present: 2, missing: 1 },
        { title: "مهني فني", total: 12, present: 5, missing: 7 },
        { title: "مهني طباخ", total: 26, present: 12, missing: 14 },
        { title: "الجيس البنغالي فني", total: 23, present: 11, missing: 12 },
        { title: "الجيش البنغالي طباخ", total: 2, present: 0, missing: 2 },
      ]
    }
  ];

  const distributions = [
    { title: "التوزيع الأول", data: firstDistribution },
    { title: "التوزيع الثاني", data: secondDistribution },
    { title: "التوزيع الثالث", data: thirdDistribution },
    { title: "التوزيع الرابع", data: fourthDistribution },
  ];
  
  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
        <SystemHeader
          title={"إدارة الطواقم"}
          isPrinting={true}
          isSaving={false}
          printFn={() => printCrews('الاولي', employees)}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 3
          }}
        >
          {distributions.map((distribution, i) => (
            <Box key={i}>
              <DistributionTables distribution={distribution} index={i} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Crews;
