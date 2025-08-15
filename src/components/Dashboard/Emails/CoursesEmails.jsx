import React from 'react';
import EmailTable from './EmailTable';

const CoursesEmails = () => {
  // Initial emails data for courses
  const initialEmails = [
    { id: 1, email: 'courses@coastguard.gov.kw' },
    { id: 2, email: 'training@coastguard.gov.kw' },
    { id: 3, email: 'education@coastguard.gov.kw' },
    { id: 4, email: 'development@coastguard.gov.kw' }
  ];

  // Handle emails change (optional callback)
  const handleEmailsChange = (updatedEmails) => {
    // You can add any additional logic here if needed
    console.log('Courses emails updated:', updatedEmails);
  };

  return (
    <EmailTable 
      title="إدارة رسائل البريد الإلكتروني للدورات"
      initialEmails={initialEmails}
      onEmailsChange={handleEmailsChange}
    />
  );
};

export default CoursesEmails;
