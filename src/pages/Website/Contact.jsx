import { Container, Box, Fade } from '@mui/material';
import React, { useState } from 'react';
import ContactHeader from '../../components/Website/Contact/ContactHeader';
import ContactForm from '../../components/Website/Contact/ContactForm';
import ContactSuccess from '../../components/Website/Contact/ContactSuccess';

const Contact = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitSuccess = (formData) => {
    setSubmittedData(formData);
    setShowSuccess(true);
  };

  const handleBackToForm = () => {
    setShowSuccess(false);
    setSubmittedData(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 3, md: 5 }, minHeight: '80vh' }}>
        <ContactHeader />
        
        <Fade in={!showSuccess} timeout={500}>
          <Box sx={{ display: showSuccess ? 'none' : 'block' }}>
            <ContactForm onSubmitSuccess={handleSubmitSuccess} />
          </Box>
        </Fade>
        
        <Fade in={showSuccess} timeout={500}>
          <Box sx={{ display: showSuccess ? 'block' : 'none' }}>
            <ContactSuccess 
              formData={submittedData} 
              onClose={handleBackToForm} 
            />
          </Box>
        </Fade>
      </Box>
    </Container>
  );
}

export default Contact;
