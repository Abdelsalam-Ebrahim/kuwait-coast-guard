import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import ThemeProvider from './theme/ThemeProvider.jsx'


const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
