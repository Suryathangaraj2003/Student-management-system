import React, { useState } from 'react';
import AddStudent from '../components/AddStudent';
import UploadMarks from '../components/UploadMarks'; // Assuming this component handles the mark uploads
import ViewStudents from '../components/ViewStudents';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('addStudent');

  const renderContent = () => {
    switch (activeTab) {
      case 'addStudent':
        return <AddStudent />;
      case 'uploadMarks':
        return <UploadMarks />; // This should be the component handling mark uploads
      case 'viewDetails':
        return <ViewStudents />;
      default:
        return <AddStudent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('addStudent')}
            className={`py-2 px-4 rounded-lg border-2 transition-colors ${
              activeTab === 'addStudent'
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
            }`}
          >
            Add Student
          </button>
          <button
            onClick={() => setActiveTab('uploadMarks')}
            className={`py-2 px-4 rounded-lg border-2 transition-colors ${
              activeTab === 'uploadMarks'
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
            }`}
          >
            Upload Marks
          </button>
          <button
            onClick={() => setActiveTab('viewDetails')}
            className={`py-2 px-4 rounded-lg border-2 transition-colors ${
              activeTab === 'viewDetails'
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
            }`}
          >
            View Details
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
