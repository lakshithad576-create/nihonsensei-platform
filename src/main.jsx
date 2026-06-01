import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';

// 1. Import our Pages
import Home from './routes/Home';
import Login from './routes/Login';
import LoginCallback from './routes/LoginCallback';
import Dashboard from './routes/Dashboard';
import Signup from './routes/Signup';
import AdminDashboard from './routes/AdminDashboard'; // <-- 1. Imported the Admin page

// 2. Create the Root Layout (This surrounds every page)
const rootRoute = createRootRoute({
  component: () => (
    <main className="w-full">
      <Outlet />
    </main>
  ),
});

// 3. Define the Routes
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

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
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
  component: AdminDashboard, 
});

// 4. Build the Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  loginCallbackRoute,
  dashboardRoute,
  signupRoute,
  adminRoute, // <-- 3. Added Admin to the tree
]);

const router = createRouter({ routeTree });

// 5. Render the App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);