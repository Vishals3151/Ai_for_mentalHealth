import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFileText, FiTrash2 } from 'react-icons/fi';

const JournalListPage = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/journals`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setJournals(response.data);
    } catch (err) {
      setError('Failed to fetch journals.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  if (loading) return <p className="text-center text-slate-500">Loading journals...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center text-4xl font-bold text-slate-800">
          <FiFileText className="mr-3" /> All Journals
        </h1>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Title</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Tags</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Created Date</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {journals.map((journal) => (
              <tr key={journal._id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{journal.title}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {journal.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-sky-100 text-sky-800">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-500">{new Date(journal.createdAt).toLocaleDateString()}</td>
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

export default JournalListPage;