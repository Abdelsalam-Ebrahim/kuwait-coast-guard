import React from 'react';
import EmailTable from './EmailTable';

const MalfunctionsEmails = () => {
  // Initial emails data for malfunctions
  const initialEmails = [
    { id: 1, email: 'malfunctions@coastguard.gov.kw' },
    { id: 2, email: 'technical@coastguard.gov.kw' },
    { id: 3, email: 'maintenance@coastguard.gov.kw' }
  ];

  // Handle emails change (optional callback)
  const handleEmailsChange = (updatedEmails) => {
    // You can add any additional logic here if needed
    console.log('Malfunctions emails updated:', updatedEmails);
  };

  return (
    <EmailTable 
      title="إدارة رسائل الأعطال الإلكترونية"
      initialEmails={initialEmails}
      onEmailsChange={handleEmailsChange}
    />
  );
};

export default MalfunctionsEmails;
