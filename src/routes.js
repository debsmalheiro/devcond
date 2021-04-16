// Dependencies
import React from 'react';

// Components
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Logout = React.lazy(() => import('./views/Logout'));
const Wall = React.lazy(() => import('./views/Wall'));

// Routes
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/wall', name: 'Wall', component: Wall },
];

// Export module
export default routes;
