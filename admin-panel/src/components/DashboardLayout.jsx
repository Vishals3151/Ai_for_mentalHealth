import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiLogOut,
  FiFileText,
  FiSmile,
  FiMessageSquare,
} from "react-icons/fi";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const baseLinkClass =
    "flex items-center p-3 my-1 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors";
  const activeLinkClass = "bg-slate-900 text-white font-semibold";

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <nav className="flex flex-col w-64 text-white bg-slate-800">
        <div className="flex items-center justify-center p-4 border-b h-18 border-slate-700">
          <h1 className="text-xl font-bold tracking-wider uppercase">Admin</h1>
        </div>
        <div className="flex-1 p-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            <FiHome className="mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            <FiUsers className="mr-3" />
            Manage Users
          </NavLink>
          <NavLink
            to="/journals"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            <FiFileText className="mr-3" />
            All Journals
          </NavLink>
          <NavLink
            to="/moods"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            <FiSmile className="mr-3" />
            Mood Entries
          </NavLink>
          <NavLink
            to="/anonymous-posts"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            <FiMessageSquare className="mr-3" />
            Anonymous Posts
          </NavLink>
        </div>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-3 font-bold text-red-400 transition-colors rounded-lg hover:bg-red-500 hover:text-white"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </div>
  );
};

export default DashboardLayout;