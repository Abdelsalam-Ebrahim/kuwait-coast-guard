// router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from "../layouts/Layout.jsx";
import { useAuth } from '../store/AuthContext.jsx';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

// Prevent showing login page if already authenticated
const ProtectLogin = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, lazy: () => import('../pages/Website/Home.jsx').then(m => ({ Component: m.default })) },
      { path: 'home', lazy: () => import('../pages/Website/Home.jsx').then(m => ({ Component: m.default })) },
      { path: 'courses', lazy: () => import('../pages/Website/Courses.jsx').then(m => ({ Component: m.default })) },
      { path: 'malfunctions', lazy: () => import('../pages/Website/Malfunctions.jsx').then(m => ({ Component: m.default })) },
      { path: 'public-register', lazy: () => import('../pages/Website/PublicRegister.jsx').then(m => ({ Component: m.default })) },
      { path: 'contact', lazy: () => import('../pages/Website/Contact.jsx').then(m => ({ Component: m.default })) },
      { path: 'notifications', lazy: () => import('../pages/Website/Notifications.jsx').then(m => ({ Component: m.default })) },
      { path: 'squad/:id', lazy: () => import('../pages/Website/Squads.jsx').then(m => ({ Component: m.default })) },
    ],
  },
  {
    path: '/login',
    lazy: () => import('../pages/Website/Login.jsx').then(m => ({ Component: () => ( <ProtectLogin><m.default /></ProtectLogin>)})),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute adminOnly>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, lazy: () => import('../pages/Dashboard/Dashboard.jsx').then(m => ({ Component: m.default })) },
    ],
  },
  { path: '*', lazy: () => import('../pages/NotFound.jsx').then(m => ({ Component: m.default })) },
]);

export default router;
