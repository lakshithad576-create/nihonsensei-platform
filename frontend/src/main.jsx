import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';

import Home from './pages/Home';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import VerifyOTP from './pages/VerifyOTP'; // Adjust path if needed
import ForgotPassword from './pages/ForgotPassword'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

function ProtectedDashboardRoute() {
  return (
    <ProtectedLayout>
      <Dashboard />
    </ProtectedLayout>
  );
}

function ProtectedAdminRoute() {
  return (
    <ProtectedLayout requireAdmin>
      <AdminDashboard />
    </ProtectedLayout>
  );
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: ProtectedDashboardRoute,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: ProtectedAdminRoute,
});

const verifyOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify-otp',
  component: VerifyOTP,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPassword,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  verifyOtpRoute,
  forgotPasswordRoute,
  dashboardRoute,
  signupRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);