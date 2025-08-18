// Utility functions for printing components

const printTechnical = (groupNumber = 'الأولى', technicalData = [], tableHeadCalendar = []) => {
  const tableHeaders = [
    'الرتبة',
    'الاسم',
    ...tableHeadCalendar,
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
      <title>كشف الفنية</title>
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
          <h3>كشف الفنية</h3>
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
            ${technicalData.map((row, index) => `
              <tr${index % 2 === 1 ? ' style="background-color: #fafafa;"' : ''}>
                <td>${row.rank}</td>
                <td>${row.fullName}</td>
                ${row.reason.map(reason => `<td>${reason}</td>`).join('')}
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

export default printTechnical;
