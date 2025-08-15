import React from 'react';
import EmailTable from './EmailTable';

const ContactEmail = () => {
  // Initial emails data for contact
  const initialEmails = [
    { id: 1, email: 'admin@coastguard.gov.kw' },
    { id: 2, email: 'info@coastguard.gov.kw' },
    { id: 3, email: 'support@coastguard.gov.kw' }
  ];

  // Handle emails change (optional callback)
  const handleEmailsChange = (updatedEmails) => {
    // You can add any additional logic here if needed
    console.log('Contact emails updated:', updatedEmails);
  };

  return (
    <EmailTable 
      title="إدارة رسائل البريد الإلكتروني"
      initialEmails={initialEmails}
      onEmailsChange={handleEmailsChange}
    />
  );
};

export default ContactEmail;
