import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('adminToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch user details and user activity in parallel
        const [userRes, activityRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, { headers }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}/activity`, { headers })
        ]);

        setUser(userRes.data);
        setActivity(activityRes.data);
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p className="text-center text-slate-500">Loading user history...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="container mx-auto">
      <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-slate-800">{user.name}</h1>
        <p className="text-slate-500">{user.email}</p>
        <div className="mt-4 text-sm text-slate-600">
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Journals Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-700">Journals ({activity?.journals.length ?? 0})</h2>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            {activity?.journals.length > 0 ? (
              <ul className="divide-y divide-slate-200">
                {activity.journals.map(j => <li key={j._id} className="py-3 font-medium">{j.title}</li>)}
              </ul>
            ) : <p className="text-slate-500">No journals found for this user.</p>}
          </div>
        </div>

        {/* Moods Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-700">Mood History ({activity?.moods.length ?? 0})</h2>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            {activity?.moods.length > 0 ? (
              <ul className="divide-y divide-slate-200">
                {activity.moods.map(m => (
                  <li key={m._id} className="flex justify-between py-3">
                    <span className="font-medium">{m.mood}</span>
                    <span className="text-slate-500">{new Date(m.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-slate-500">No mood entries found for this user.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;