import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSmile, FiTrash2 } from 'react-icons/fi';

const MoodListPage = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:4000/api/admin/moods', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMoods(response.data);
      } catch (err) {
        setError('Failed to fetch mood entries.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, []);

  if (loading) return <p className="text-center text-slate-500">Loading mood entries...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center text-4xl font-bold text-slate-800">
          <FiSmile className="mr-3" /> Mood Entries
        </h1>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">User</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Mood</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Date</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {moods.map((moodEntry) => (
              <tr key={moodEntry._id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{moodEntry.user?.name || 'Unknown User'}</div>
                  <div className="text-sm text-slate-500">{moodEntry.user?.email}</div>
                </td>
                <td className="p-4 font-medium text-slate-800 capitalize">{moodEntry.mood}</td>
                <td className="p-4 text-sm text-slate-500">{new Date(moodEntry.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <button className="p-2 text-red-600 transition-colors rounded-md hover:bg-red-100">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoodListPage;