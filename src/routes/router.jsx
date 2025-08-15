import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

const getAuthStatus = () => {
  const isAuthenticated = localStorage.getItem('authToken') === 'dummy-token';
  const isAdmin = localStorage.getItem('adminToken') === 'dummy-token';
  return { isAuthenticated, isAdmin };
};

const RootRedirect = () => {
  const { isAuthenticated } = getAuthStatus();
  return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />;
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = getAuthStatus();

  if (adminOnly && !isAdmin) {
    return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectLogin = ({ children }) => {
  const { isAuthenticated } = getAuthStatus();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  { path: '/login', lazy: () => import('../pages/Website/Login.jsx').then(m => ({ Component: () => <ProtectLogin><m.default /></ProtectLogin> })) },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <PublicLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'home', lazy: () => import('../pages/Website/Home.jsx').then(m => ({ Component: m.default })) },
      { path: 'courses', lazy: () => import('../pages/Website/Courses.jsx').then(m => ({ Component: m.default })) },
      { path: 'malfunctions', lazy: () => import('../pages/Website/Malfunctions.jsx').then(m => ({ Component: m.default })) },
      { path: 'first-group', lazy: () => import('../pages/Website/FirstGroup.jsx').then(m => ({ Component: m.default })) },
      { path: 'second-group', lazy: () => import('../pages/Website/SecondGroup.jsx').then(m => ({ Component: m.default })) },
      { path: 'third-group', lazy: () => import('../pages/Website/ThirdGroup.jsx').then(m => ({ Component: m.default })) },
      { path: 'public-register', lazy: () => import('../pages/Website/PublicRegister.jsx').then(m => ({ Component: m.default })) },
      { path: 'contact', lazy: () => import('../pages/Website/Contact.jsx').then(m => ({ Component: m.default })) },
      { path: 'notifications', lazy: () => import('../pages/Website/Notifications.jsx').then(m => ({ Component: m.default })) },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute adminOnly>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, lazy: () => import('../pages/Dashboard/Dashboard.jsx').then(m => ({ Component: m.default })) },
    ],
  },
  { path: '*', lazy: () => import('../pages/NotFound.jsx').then(m => ({ Component: m.default })) },
]);

export default router;