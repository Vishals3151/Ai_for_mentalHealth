import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          "http://localhost:4000/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:4000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Refresh user list after deletion
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        console.error("Failed to delete user", err);
        alert("Could not delete user.");
      }
    }
  };

  if (loading)
    return <p className="text-center text-slate-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-slate-800">User Management</h1>
        <button className="flex items-center px-4 py-2 font-bold text-white transition-colors bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700">
          <FiUserPlus className="mr-2" />
          Add User
        </button>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">
                User
              </th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">
                Role
              </th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">
                Joined Date
              </th>
              <th className="p-4 text-sm font-semibold tracking-wider text-left text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="p-4 whitespace-nowrap">
                  {/* MAKE THE USER'S NAME A LINK */}
                  <Link to={`/users/${user._id}`} className="hover:underline">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-indigo-800 bg-indigo-100 rounded-full">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                {/* ... other tds */}
                <td className="p-4 text-sm whitespace-nowrap">
                  <button className="p-2 mr-2 text-blue-600 transition-colors rounded-md hover:bg-blue-100">
                    <FiEdit />
                  </button>
                  {/* ADD ONCLICK TO DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2 text-red-600 transition-colors rounded-md hover:bg-red-100"
                  >
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

export default UserListPage;
