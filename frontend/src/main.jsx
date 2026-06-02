import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/login';
import LoginCallback from './routes/LoginCallback';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

const rootRoute = createRootRoute({
  component: () => (
    <main className="w-full">
      <Outlet />
    </main>
  ),
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

const loginCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login-callback',
  component: LoginCallback,
});

function ProtectedDashboardRoute() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedAdminRoute() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboard />
    </ProtectedRoute>
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

// <-- 2. Created the Admin Route
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: ProtectedAdminRoute,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  loginCallbackRoute,
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