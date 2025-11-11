import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { hasAnyRole } from '../components/RoleGuard.jsx';
import { validateEmail } from '../utils/validation.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'doctor' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api('/users');
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addUser = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (form.email && !validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.role) newErrors.role = 'Role is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    try {
      await api('/users', { method: 'POST', body: form });
      setForm({ name: '', email: '', password: '', role: 'doctor' });
      setErrors({});
      if (window.showNotification) window.showNotification('User created successfully', 'success');
      await load();
    } catch (error) {
      setSubmitError(error.message || 'Failed to create user');
      if (window.showNotification) window.showNotification(error.message || 'Failed to create user', 'error');
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="hidden sm:block text-xs text-gray-500">Administer staff and roles</div>
      </div>

      {hasAnyRole('admin') && (
        <form onSubmit={addUser} className="mb-4 rounded-xl bg-white/90 p-3 shadow">
          <div className="mb-2 flex flex-wrap items-start gap-2">
            <div className="w-48">
              <input
                className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Name *"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                required
              />
              {errors.name && <div className="mt-1 text-xs text-red-600">{errors.name}</div>}
            </div>
            <div className="w-60">
              <input
                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                required
              />
              {errors.email && <div className="mt-1 text-xs text-red-600">{errors.email}</div>}
            </div>
            <div className="w-48">
              <input
                className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                type="password"
                placeholder="Password *"
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                required
              />
              {errors.password && <div className="mt-1 text-xs text-red-600">{errors.password}</div>}
            </div>
            <div className="w-44">
              <select
                className={`w-full ${errors.role ? 'border-red-500' : ''}`}
                value={form.role}
                onChange={(e) => { setForm({ ...form, role: e.target.value }); setErrors({ ...errors, role: '' }); }}
                required
              >
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <div className="mt-1 text-xs text-red-600">{errors.role}</div>}
            </div>
            <button type="submit" className="self-end">Add User</button>
          </div>
          {submitError && <div className="text-sm text-red-600">{submitError}</div>}
        </form>
      )}

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{u.id}</td>
                  <td className="px-4 py-2 text-sm font-medium">{u.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


