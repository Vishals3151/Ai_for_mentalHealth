import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMessageSquare, FiTrash2 } from 'react-icons/fi';

const AnonymousPostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/anonymous-posts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch anonymous posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-slate-500">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center text-4xl font-bold text-slate-800">
          <FiMessageSquare className="mr-3" /> Anonymous Posts
        </h1>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Title</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Category</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Created Date</th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{post.title}</td>
                <td className="p-4 text-sm capitalize">
                  <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">
                    {post.options}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</td>
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

export default AnonymousPostListPage;