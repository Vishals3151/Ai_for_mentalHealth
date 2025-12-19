import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiFileText, FiSmile, FiMessageSquare } from 'react-icons/fi';

const StatCard = ({ icon, title, value, color }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100`}>
        {React.createElement(icon, { className: `w-6 h-6 text-${color}-600` })}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardHomePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:4000/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-slate-500">Loading dashboard...</p>;

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-slate-800">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiUsers} title="Total Users" value={stats?.users ?? 0} color="indigo" />
        <StatCard icon={FiFileText} title="Total Journals" value={stats?.journals ?? 0} color="green" />
        <StatCard icon={FiMessageSquare} title="Anonymous Posts" value={stats?.anonymousPosts ?? 0} color="amber" />
        <StatCard icon={FiSmile} title="Mood Entries" value={stats?.moodEntries ?? 0} color="sky" />
      </div>
    </div>
  );
};

export default DashboardHomePage;