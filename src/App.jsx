import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import TopNav from './components/TopNav.jsx';
import ClientTypeCheck from './components/ClientTypeCheck.jsx';
import IntakeWizard from './components/IntakeWizard.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ClientsPage from './components/ClientsPage.jsx';
import Login from './components/Login.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import ShareDashboard from './components/ShareDashboard.jsx';

// Trainer layout — global top nav + auth gate
function TrainerLayout() {
  return (
    <RequireAuth>
      <TopNav />
      <Outlet />
    </RequireAuth>
  );
}

// Public layout — top nav with no trainer links, no auth gate
function PublicLayout() {
  return (
    <>
      <TopNav variant="public" />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/share/:token" element={<ShareDashboard />} />
      </Route>

      {/* Trainer routes (auth required) */}
      <Route element={<TrainerLayout />}>
        <Route path="/" element={<ClientTypeCheck />} />
        <Route path="/intake" element={<IntakeWizard />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
