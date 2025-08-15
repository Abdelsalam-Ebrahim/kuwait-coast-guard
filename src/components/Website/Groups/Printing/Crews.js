// Utility functions for printing components

const printCrewsContent = (groupNumber = 'الأولى', crewsData = []) => {
  const tableHeaders = [
    'الرقم',
    'اسم الطاقم',
    'القائد',
    'المساعد',
    'نوع المهمة',
    'المنطقة',
    'التوقيت'
  ];

  // Get current date and time in Arabic
  const now = new Date();
  const currentDate = now.toLocaleDateString('ar-KW', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const currentTime = now.toLocaleTimeString('ar-KW', { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  // Default sample data if no data provided
  const defaultCrewsData = [
    { id: 1, crewName: 'طاقم ألفا', leader: 'أحمد محمد علي', assistant: 'محمد أحمد سالم', mission: 'دورية بحرية', area: 'المنطقة الشمالية', timing: '06:00 - 14:00' },
    { id: 2, crewName: 'طاقم بيتا', leader: 'علي سالم محمد', assistant: 'سالم أحمد علي', mission: 'مراقبة ساحلية', area: 'المنطقة الجنوبية', timing: '14:00 - 22:00' },
    { id: 3, crewName: 'طاقم جاما', leader: 'محمد علي أحمد', assistant: 'خالد عبدالله محمد', mission: 'إنقاذ بحري', area: 'المنطقة الوسطى', timing: '22:00 - 06:00' },
  ];

  const finalCrewsData = crewsData.length > 0 ? crewsData : defaultCrewsData;

  // Create a hidden iframe for printing
  const printFrame = document.createElement('iframe');
  printFrame.style.cssText = `
    position: absolute;
    top: -10000px;
    left: -10000px;
    width: 0;
    height: 0;
    border: none;
  `;
  
  document.body.appendChild(printFrame);

  // Create print content HTML
  const printContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>كشف الطواقم</title>
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
        
        .print-container {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #1976d2;
        }
        
        .header h2 {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }
        
        .header h3 {
          font-size: 18px;
          color: #424242;
          font-weight: bold;
        }
        
        .header .date {
          color: #666;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
          border: 2px solid #333;
        }
        
        th, td {
          border: 1px solid #ddd;
          text-align: center;
          font-size: 14px;
          padding: 8px;
        }
        
        th {
          background-color: #f5f5f5;
          font-weight: bold;
          font-size: 16px;
        }
        
        tr:nth-child(even) {
          background-color: #fafafa;
        }
        
        @media print {
          body { 
            padding: 0; 
            margin: 0;
          }
          .no-print { 
            display: none; 
          }
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="header">
          <h1>خفر السواحل - القطاع الأوسط</h1>
          <h2>السرية ${groupNumber}</h2>
          <h3>كشف الطواقم</h3>
          <div class="date">
            <p>${currentDate}</p>
            <p>الساعة: ${currentTime}</p>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              ${tableHeaders.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${finalCrewsData.map((row, index) => `
              <tr${index % 2 === 1 ? ' style="background-color: #fafafa;"' : ''}>
                <td>${index + 1}</td>
                <td>${row.crewName}</td>
                <td>${row.leader}</td>
                <td>${row.assistant}</td>
                <td>${row.mission}</td>
                <td>${row.area}</td>
                <td>${row.timing}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;

  // Write content to iframe and print
  printFrame.onload = function() {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch (error) {
      console.log('Print error:', error);
      // Fallback method
      window.print();
    }
    
    // Clean up iframe after a short delay
    setTimeout(() => {
      if (document.body.contains(printFrame)) {
        document.body.removeChild(printFrame);
      }
    }, 1000);
  };

  const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(printContent);
  frameDoc.close();
};

export default printCrewsContent;
