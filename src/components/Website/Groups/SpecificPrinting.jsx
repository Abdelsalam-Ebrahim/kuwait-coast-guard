import React, { forwardRef } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider
} from '@mui/material';

// Function to create and print content
export const printContent = (printType, groupNumber, printTitle) => {
  // Get table data based on print type
  const getTableData = () => {
    switch (printType) {
      case 'audience':
        return {
          headers: ['الرقم', 'الاسم الكامل', 'الرتبة', 'المسمى الوظيفي', 'الفئة', 'الحضور'],
          data: [
            { id: 1, name: 'أحمد محمد علي', rank: 'ملازم أول', jobTitle: 'ضابط بحري', category: 'ضباط', attendance: '' },
            { id: 2, name: 'محمد أحمد سالم', rank: 'ملازم', jobTitle: 'ضابط إنقاذ', category: 'ضباط', attendance: '' },
            { id: 3, name: 'علي سالم محمد', rank: 'رقيب أول', jobTitle: 'مشغل راديو', category: 'ضباط صف', attendance: '' },
            { id: 4, name: 'سالم أحمد علي', rank: 'رقيب', jobTitle: 'فني محركات', category: 'ضباط صف', attendance: '' },
            { id: 5, name: 'محمد علي أحمد', rank: 'عريف', jobTitle: 'بحار', category: 'أفراد', attendance: '' },
          ]
        };
      
      case 'distribution':
        return {
          headers: ['الرقم', 'النشاط', 'المسؤول', 'التوقيت', 'الملاحظات'],
          data: [
            { id: 1, activity: 'دورية بحرية', responsible: 'أحمد محمد', timing: '08:00 - 12:00', notes: 'المنطقة الشمالية' },
            { id: 2, activity: 'مراقبة ساحلية', responsible: 'محمد أحمد', timing: '12:00 - 16:00', notes: 'المنطقة الجنوبية' },
            { id: 3, activity: 'تفتيش المراكب', responsible: 'علي سالم', timing: '16:00 - 20:00', notes: 'الميناء الرئيسي' },
            { id: 4, activity: 'الاستعداد الطارئ', responsible: 'سالم أحمد', timing: '20:00 - 00:00', notes: 'جميع المناطق' },
            { id: 5, activity: 'التنسيق الإداري', responsible: 'محمد علي', timing: '00:00 - 08:00', notes: 'المقر الرئيسي' },
          ]
        };
      
      case 'crews':
        return {
          headers: ['الرقم', 'الطاقم', 'القائد', 'العدد', 'المهمة'],
          data: [
            { id: 1, crew: 'الطاقم الأول', leader: 'أحمد محمد علي', count: '8 أفراد', mission: 'الدورية البحرية' },
            { id: 2, crew: 'الطاقم الثاني', leader: 'محمد أحمد سالم', count: '6 أفراد', mission: 'المراقبة الساحلية' },
            { id: 3, crew: 'الطاقم الثالث', leader: 'علي سالم محمد', count: '7 أفراد', mission: 'الإنقاذ البحري' },
            { id: 4, crew: 'الطاقم الرابع', leader: 'سالم أحمد علي', count: '5 أفراد', mission: 'التفتيش الأمني' },
            { id: 5, crew: 'الطاقم الخامس', leader: 'محمد علي أحمد', count: '9 أفراد', mission: 'الاستعداد الطارئ' },
          ]
        };
      
      case 'outsiders':
        return {
          headers: ['الرقم', 'الاسم', 'الجهة', 'رقم الهوية', 'الغرض من الزيارة'],
          data: [
            { id: 1, name: 'خالد أحمد محمد', organization: 'وزارة الداخلية', idNumber: '123456789', purpose: 'تنسيق أمني' },
            { id: 2, name: 'عبدالله محمد سالم', organization: 'الجمارك الكويتية', idNumber: '987654321', purpose: 'فحص البضائع' },
            { id: 3, name: 'فهد سالم أحمد', organization: 'وزارة الخارجية', idNumber: '456789123', purpose: 'اجتماع دبلوماسي' },
            { id: 4, name: 'ناصر علي محمد', organization: 'الهيئة العامة للبيئة', idNumber: '789123456', purpose: 'تقييم بيئي' },
            { id: 5, name: 'بدر أحمد علي', organization: 'وزارة النفط', idNumber: '321654987', purpose: 'تفتيش المنشآت' },
          ]
        };
      
      default:
        return {
          headers: ['الرقم', 'البيان', 'التفاصيل', 'الملاحظات'],
          data: [
            { id: 1, item: 'بيان أول', details: 'تفاصيل البيان الأول', notes: 'ملاحظات' },
            { id: 2, item: 'بيان ثاني', details: 'تفاصيل البيان الثاني', notes: 'ملاحظات' },
            { id: 3, item: 'بيان ثالث', details: 'تفاصيل البيان الثالث', notes: 'ملاحظات' },
          ]
        };
    }
  };

  const tableData = getTableData();
  const currentDate = new Date().toLocaleDateString('ar-KW');
  const currentTime = new Date().toLocaleTimeString('ar-KW');

  // Create HTML content for printing
  const printHTML = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${printTitle} - ${currentDate}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          direction: rtl;
          background: white;
          padding: 20px;
          line-height: 1.6;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }
        
        .header h2 {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #555;
        }
        
        .header h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #666;
        }
        
        .header p {
          color: #777;
          font-size: 14px;
        }
        
        .table-container {
          margin: 20px 0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid #333;
        }
        
        th, td {
          border: 1px solid #666;
          padding: 12px 8px;
          text-align: center;
          font-size: 14px;
        }
        
        th {
          background-color: #f5f5f5;
          font-weight: bold;
          font-size: 16px;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .empty-row {
          height: 50px;
        }
        
        .footer {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: end;
        }
        
        .signature-box {
          text-align: center;
        }
        
        .signature-line {
          border-bottom: 1px solid #333;
          width: 200px;
          height: 30px;
          margin: 10px 0;
        }
        
        .signature-label {
          font-size: 12px;
          color: #666;
        }
        
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>خفر السواحل - القطاع الأوسط</h1>
        ${groupNumber ? `<h2>المجموعة ${groupNumber}</h2>` : ''}
        <h3>${printTitle}</h3>
        <p>${new Date().toLocaleDateString('ar-KW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${currentDate} - ${currentTime}</p>
      </div>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${tableData.headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${tableData.data.map(row => `
              <tr>
                ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
              </tr>
            `).join('')}
            ${Array(5).fill().map(() => `
              <tr class="empty-row">
                ${tableData.headers.map(() => `<td>&nbsp;</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="footer">
        <div class="signature-box">
          <p>المسؤول:</p>
          <div class="signature-line"></div>
          <p class="signature-label">التوقيع والختم</p>
        </div>
        
        <div style="text-align: center;">
          <p style="font-size: 12px; color: #666;">
            تم الطباعة في: ${new Date().toLocaleString('ar-KW')}
          </p>
        </div>
        
        <div class="signature-box">
          <p>المراجع:</p>
          <div class="signature-line"></div>
          <p class="signature-label">التوقيع والختم</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Open new window and print
  const printWindow = window.open('', '_blank');
  printWindow.document.write(printHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};

const SpecificPrinting = forwardRef(({ groupNumber, printTitle, printType }, ref) => {
  // Sample data for different print types
  const getTableData = () => {
    switch (printType) {
      case 'audience':
        return {
          headers: ['الرقم', 'الاسم الكامل', 'الرتبة', 'المسمى الوظيفي', 'الفئة', 'الحضور'],
          data: [
            { id: 1, name: 'أحمد محمد علي', rank: 'ملازم أول', jobTitle: 'ضابط بحري', category: 'ضباط', attendance: '' },
            { id: 2, name: 'محمد أحمد سالم', rank: 'ملازم', jobTitle: 'ضابط إنقاذ', category: 'ضباط', attendance: '' },
            { id: 3, name: 'علي سالم محمد', rank: 'رقيب أول', jobTitle: 'مشغل راديو', category: 'ضباط صف', attendance: '' },
            { id: 4, name: 'سالم أحمد علي', rank: 'رقيب', jobTitle: 'فني محركات', category: 'ضباط صف', attendance: '' },
            { id: 5, name: 'محمد علي أحمد', rank: 'عريف', jobTitle: 'بحار', category: 'أفراد', attendance: '' },
          ]
        };
      
      case 'distribution':
        return {
          headers: ['الرقم', 'النشاط', 'المسؤول', 'التوقيت', 'الملاحظات'],
          data: [
            { id: 1, activity: 'دورية بحرية', responsible: 'أحمد محمد', timing: '08:00 - 12:00', notes: 'المنطقة الشمالية' },
            { id: 2, activity: 'مراقبة ساحلية', responsible: 'محمد أحمد', timing: '12:00 - 16:00', notes: 'المنطقة الجنوبية' },
            { id: 3, activity: 'تفتيش المراكب', responsible: 'علي سالم', timing: '16:00 - 20:00', notes: 'الميناء الرئيسي' },
            { id: 4, activity: 'الاستعداد الطارئ', responsible: 'سالم أحمد', timing: '20:00 - 00:00', notes: 'جميع المناطق' },
            { id: 5, activity: 'التنسيق الإداري', responsible: 'محمد علي', timing: '00:00 - 08:00', notes: 'المقر الرئيسي' },
          ]
        };
      
      case 'crews':
        return {
          headers: ['الرقم', 'الطاقم', 'القائد', 'العدد', 'المهمة'],
          data: [
            { id: 1, crew: 'الطاقم الأول', leader: 'أحمد محمد علي', count: '8 أفراد', mission: 'الدورية البحرية' },
            { id: 2, crew: 'الطاقم الثاني', leader: 'محمد أحمد سالم', count: '6 أفراد', mission: 'المراقبة الساحلية' },
            { id: 3, crew: 'الطاقم الثالث', leader: 'علي سالم محمد', count: '7 أفراد', mission: 'الإنقاذ البحري' },
            { id: 4, crew: 'الطاقم الرابع', leader: 'سالم أحمد علي', count: '5 أفراد', mission: 'التفتيش الأمني' },
            { id: 5, crew: 'الطاقم الخامس', leader: 'محمد علي أحمد', count: '9 أفراد', mission: 'الاستعداد الطارئ' },
          ]
        };
      
      case 'outsiders':
        return {
          headers: ['الرقم', 'الاسم', 'الجهة', 'رقم الهوية', 'الغرض من الزيارة'],
          data: [
            { id: 1, name: 'خالد أحمد محمد', organization: 'وزارة الداخلية', idNumber: '123456789', purpose: 'تنسيق أمني' },
            { id: 2, name: 'عبدالله محمد سالم', organization: 'الجمارك الكويتية', idNumber: '987654321', purpose: 'فحص البضائع' },
            { id: 3, name: 'فهد سالم أحمد', organization: 'وزارة الخارجية', idNumber: '456789123', purpose: 'اجتماع دبلوماسي' },
            { id: 4, name: 'ناصر علي محمد', organization: 'الهيئة العامة للبيئة', idNumber: '789123456', purpose: 'تقييم بيئي' },
            { id: 5, name: 'بدر أحمد علي', organization: 'وزارة النفط', idNumber: '321654987', purpose: 'تفتيش المنشآت' },
          ]
        };
      
      default:
        return {
          headers: ['الرقم', 'البيان', 'التفاصيل', 'الملاحظات'],
          data: [
            { id: 1, item: 'بيان أول', details: 'تفاصيل البيان الأول', notes: 'ملاحظات' },
            { id: 2, item: 'بيان ثاني', details: 'تفاصيل البيان الثاني', notes: 'ملاحظات' },
            { id: 3, item: 'بيان ثالث', details: 'تفاصيل البيان الثالث', notes: 'ملاحظات' },
          ]
        };
    }
  };

  const tableData = getTableData();

  return (
    <Box ref={ref} sx={{ p: 3, bgcolor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
          خفر السواحل - القطاع الأوسط
        </Typography>
        {groupNumber && (
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            المجموعة {groupNumber}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#424242' }}>
          {printTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontSize: '1.1rem' }}>
          {new Date().toLocaleDateString('ar-KW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {new Date().toLocaleDateString('ar-KW')} - {new Date().toLocaleTimeString('ar-KW')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: 2, borderColor: 'grey.300' }}>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              {tableData.headers.map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    border: 1,
                    borderColor: 'grey.400',
                    py: 2
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data.map((row) => (
              <TableRow key={row.id} sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}>
                {Object.values(row).map((value, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                      py: 1.5,
                      fontSize: '1rem',
                      minHeight: '40px'
                    }}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            
            {/* Empty rows for signatures/additional entries */}
            {[...Array(5)].map((_, index) => (
              <TableRow key={`empty-${index}`} sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}>
                {tableData.headers.map((_, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                      py: 2,
                      minHeight: '50px'
                    }}
                  >
                    &nbsp;
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

SpecificPrinting.displayName = 'SpecificPrinting';

export default SpecificPrinting;
