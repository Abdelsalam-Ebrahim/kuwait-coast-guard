// Utility functions for printing components

const printCrewsContent = (distributions, groupNumber) => {
  const tableHeaders = ['الرتبة', 'المسمي', 'الاسم'];

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

  // Generate tables for each distribution
  const generateTables = () => {
    console.log("distributions: ", distributions);
    return distributions.map((distribution) => `
      <div class="table-container">
        <h4 class="table-title">${distribution.distributionPlaceName}</h4>
        <table>
          <thead>
            <tr>
              ${tableHeaders.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${distribution.people.map((employee, index) => `
              <tr${index % 2 === 1 ? ' style="background-color: #fafafa;"' : ''}>
                <td>${employee.rank}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.name}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `).join('');
  };

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
          margin-bottom: 5px;
        }
        
        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }
        
        .table-container {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        .table-title {
          font-size: 15px;
          font-weight: bold;
          color: #1976d2;
          text-align: center;
          margin-bottom: 5px;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid #333;
          font-size: 12px;
        }
        
        th, td {
          border: 1px solid #ddd;
          text-align: center;
        }
        
        th {
          background-color: #e3f2fd;
          font-weight: bold;
          font-size: 13px;
          color: #1976d2;
        }
        
        tr:nth-child(even) {
          background-color: #fafafa;
        }
        
        @media print {
          body { 
            margin: 0;
          }
          
          .tables-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          
          table {
            font-size: 10px;
          }
          
          th, td {
            padding: 2px;
          }
          
          .table-title {
            font-size: 14px;
            padding: 6px;
          }
          
          .no-print { 
            display: none; 
          }
        }
        
        @page {
          margin: 15mm;
          size: A4 landscape;
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="header">
          <h1>خفر السواحل - القطاع الأوسط</h1>
          <h2>${groupNumber}</h2>
          <h3>كشف الطواقم</h3>
          <div class="date">
            <p>${currentDate}</p>
            <p>الساعة: ${currentTime}</p>
          </div>
        </div>
        
        <div class="tables-grid">
          ${generateTables()}
        </div>
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
