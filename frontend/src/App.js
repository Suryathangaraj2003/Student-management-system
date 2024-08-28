import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashBoard';
import StudentDetails from './pages/StudentDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-details" element={<StudentDetails />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
