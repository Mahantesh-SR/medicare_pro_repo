import { useEffect, useState } from 'react';
import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Appointments from './pages/Appointments.jsx';
import PatientProfile from './pages/PatientProfile.jsx';
import Users from './pages/Users.jsx';
import { getUser, logout } from './services/auth.js';
import { hasAnyRole } from './components/RoleGuard.jsx';
import { Notification } from './components/Notification.jsx';

function PrivateRoute({ children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RoleRoute({ allowedRoles, children }) {
  const user = getUser();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const onStorage = () => setUser(getUser());
    window.addEventListener('storage', onStorage);
    // Expose notification function globally for pages to use
    window.showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
    };
    return () => {
      window.removeEventListener('storage', onStorage);
      delete window.showNotification;
    };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/pattern.svg)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="mx-auto max-w-6xl p-2 sm:p-4">
      <header className="mb-4 mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 relative">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <Link className="font-medium inline-flex items-center gap-2" to="/" onClick={() => setMenuOpen(false)}>
            <img src="/logo.svg" alt="Medicare Pro" className="h-6 w-6" />
            <span className="hidden sm:inline">Medicare Pro</span>
          </Link>
          <button
            className="sm:hidden inline-flex items-center justify-center rounded-md border border-gray-200 bg-white/80 px-2 py-1 shadow"
            aria-label="Open menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="2" fill="#374151"></circle>
              <circle cx="12" cy="12" r="2" fill="#374151"></circle>
              <circle cx="19" cy="12" r="2" fill="#374151"></circle>
            </svg>
          </button>
        </div>

        <nav className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3">
          <Link className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow hover:bg-white hover:shadow-md transition" to="/">
            Dashboard
          </Link>
          {(hasAnyRole('admin', 'doctor', 'receptionist')) && (
            <Link className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow hover:bg-white hover:shadow-md transition" to="/patients">
              Patients
            </Link>
          )}
          {(hasAnyRole('admin', 'doctor', 'receptionist')) && (
            <Link className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow hover:bg-white hover:shadow-md transition" to="/appointments">
              Appointments
            </Link>
          )}
          {(hasAnyRole('admin')) && (
            <Link className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow hover:bg-white hover:shadow-md transition" to="/users">
              Users
            </Link>
          )}
        </nav>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg sm:hidden">
            <div className="flex flex-col py-1">
              <Link className="px-4 py-2 text-sm hover:bg-gray-50" to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              {(hasAnyRole('admin', 'doctor', 'receptionist')) && (
                <Link className="px-4 py-2 text-sm hover:bg-gray-50" to="/patients" onClick={() => setMenuOpen(false)}>Patients</Link>
              )}
              {(hasAnyRole('admin', 'doctor', 'receptionist')) && (
                <Link className="px-4 py-2 text-sm hover:bg-gray-50" to="/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
              )}
              {(hasAnyRole('admin')) && (
                <Link className="px-4 py-2 text-sm hover:bg-gray-50" to="/users" onClick={() => setMenuOpen(false)}>Users</Link>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">{user.name} ({user.role})</span>
              <button onClick={() => { logout(); setUser(null); navigate('/login'); }}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </div>
      </header>
      <div className="h-px w-full bg-gray-200/80" />
      <main className="mt-4">
        <Routes>
          <Route path="/login" element={<Login onLoggedIn={() => setUser(getUser())} />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        </Routes>
      </main>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      </div>
    </div>
  );
}


