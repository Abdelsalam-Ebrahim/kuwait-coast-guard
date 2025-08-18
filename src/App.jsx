import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './routes/router';
import ThemeProvider from './theme/ThemeProvider.jsx';
import AuthProvider from './store/AuthContext.jsx';
import { QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from '@mui/material/styles';
import { queryClient } from './util/constants.js';


const App = () => {
  const theme = useTheme();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: '14px',
                fontFamily: 'inherit',
                textAlign: 'center'
              },
              success: {
                style: {
                  background: theme.palette.success.main,
                  color: theme.palette.success.contrastText,
                }
              },
              error: {
                style: {
                  background: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                }
              }
            }}
          />

        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
