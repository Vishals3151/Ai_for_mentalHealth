import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages and Components
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHomePage from "./pages/DashboardHomePage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import JournalListPage from "./pages/JournalListPage"; // Import new page
import MoodListPage from "./pages/MoodListPage"; // Import new page
import AnonymousPostListPage from "./pages/AnonymousPostListPage"; // Import new page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardHomePage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
            <Route path="/journals" element={<JournalListPage />} />
            <Route path="/moods" element={<MoodListPage />} />
            <Route path="/anonymous-posts" element={<AnonymousPostListPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;