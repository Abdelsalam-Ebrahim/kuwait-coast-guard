import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Container from '@mui/material/Container'
import Navbar from '../components/Dashboard/Navbar.jsx';
import Footer from '../components/Dashboard/Footer.jsx';

const DashboardLayout = () => {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default DashboardLayout;
