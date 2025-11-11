import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { hasAnyRole } from '../components/RoleGuard.jsx';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patient_id: '', date: '', time: '' });

  const load = async () => {
    const [appts, pats] = await Promise.all([
      api('/appointments'),
      api('/patients')
    ]);
    setAppointments(appts);
    setPatients(pats);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api('/appointments', { method: 'POST', body: form });
      setForm({ patient_id: '', date: '', time: '' });
      if (window.showNotification) {
        window.showNotification('Appointment created successfully!', 'success');
      }
      await load();
    } catch (error) {
      if (window.showNotification) {
        window.showNotification(error.message || 'Failed to create appointment', 'error');
      }
    }
  };

  const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
  const getDerivedStatus = (a) => {
    if (!a?.date) return 'pending';
    const datePart = a.date.slice(0, 10); // "YYYY-MM-DD"
    const timePart = (a.time || '00:00').slice(0, 5); // "HH:mm"

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
    const nowHHMM = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;

    if (datePart > todayStr) return 'pending';
    if (datePart < todayStr) return 'completed';
    // same day: compare times lexicographically
    return timePart > nowHHMM ? 'pending' : 'completed';
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Appointments</h2>
        <div className="hidden sm:block text-xs text-gray-500">Schedule and track appointments</div>
      </div>
      {(hasAnyRole('admin', 'receptionist')) && (
        <form onSubmit={add} className="mb-4 flex flex-wrap items-center gap-2 rounded-xl bg-white/90 p-3 shadow">
          <select className="w-56" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: Number(e.target.value) })} required>
            <option value="">Select patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
          <button type="submit">Create Appointment</button>
        </form>
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Patient</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{a.id}</td>
                <td className="px-4 py-2 text-sm font-medium">{a.patient_name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.date?.slice(0,10)}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{a.time}</td>
                <td className="px-4 py-2 text-sm">
                  {(() => {
                    const s = getDerivedStatus(a);
                    return (
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        s === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {s}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


