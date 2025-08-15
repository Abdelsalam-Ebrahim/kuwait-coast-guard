import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './routes/router';
import ThemeProvider from './theme/ThemeProvider.jsx';
import AuthProvider from './store/AuthContext.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              fontFamily: 'Arial, sans-serif',
              textAlign: 'center'
            },
            success: {
              style: {
                background: '#4caf50'
              }
            },
            error: {
              style: {
                background: '#f44336'
              }
            }
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
