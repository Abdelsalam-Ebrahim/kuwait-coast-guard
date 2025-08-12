import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'

// Centralized, code-split routes using route.lazy for optimal performance
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={{ padding: 16 }}>جاري التحميل...</div>}>
        <PublicLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        lazy: () =>
          import('../pages/Website/Home.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'courses',
        lazy: () =>
          import('../pages/Website/Courses.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'malfunctions',
        lazy: () =>
          import('../pages/Website/Malfunctions.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'first-group',
        lazy: () =>
          import('../pages/Website/FirstGroup.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'second-group',
        lazy: () =>
          import('../pages/Website/SecondGroup.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'third-group',
        lazy: () =>
          import('../pages/Website/ThirdGroup.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'contact',
        lazy: () =>
          import('../pages/Website/Contact.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'login',
        lazy: () =>
          import('../pages/Website/Login.jsx').then((m) => ({ Component: m.default })),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div style={{ padding: 16 }}>جاري تحميل لوحة التحكم...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        lazy: () =>
          import('../pages/Dashboard/Dashboard.jsx').then((m) => ({ Component: m.default })),
      },
      {
        path: 'signup',
        lazy: () =>
          import('../pages/Dashboard/Signup.jsx').then((m) => ({ Component: m.default })),
      },
    ],
  },
  {
    path: '*',
    lazy: () => import('../pages/NotFound.jsx').then((m) => ({ Component: m.default })),
  },
])

export default router;