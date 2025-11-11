import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.js';

export default function Login({ onLoggedIn }) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      await login(email, password);
      onLoggedIn?.();
      if (window.showNotification) {
        window.showNotification('Login successful!', 'success');
      }
      navigate('/');
    } catch (e) {
      const errorMsg = e.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      if (window.showNotification) {
        window.showNotification(errorMsg, 'error');
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white/70 backdrop-blur p-0 shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2">
            <img src="/logo.svg" alt="Medicare Pro" className="h-8 w-8" />
            <h2 className="text-2xl font-semibold">Welcome back</h2>
          </div>
          <p className="mb-5 text-sm text-gray-600">Sign in to continue to Medicare Pro</p>
          <form onSubmit={submit} className="grid gap-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button type="submit">Login</button>
          </form>
          {/* <div className="mt-3 text-xs text-gray-500">Tip: admin@example.com / password123</div> */}
        </div>
        <div className="hidden md:block relative bg-gradient-to-br from-blue-50 to-teal-50">
          <img
            src="/images/medical-hero.svg"
            alt="Healthcare illustration"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative h-full w-full p-6">
            <div className="mt-6 rounded-xl bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="text-sm font-medium text-gray-700">Why Medicare Pro?</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li>Streamlined patient management</li>
                <li>Secure medical records</li>
                <li>Smart appointments overview</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


