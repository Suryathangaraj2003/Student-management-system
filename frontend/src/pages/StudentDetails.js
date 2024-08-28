import React, { useState } from 'react';
import axios from 'axios';

const StudentDetails = () => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!studentId) {
      setError('Please enter a student ID.');
      return;
    }
    
    try {
      const res = await axios.get(`http://localhost:5000/api/student/${studentId}`);
      setStudent(res.data);
      setError('');
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError(error.response ? error.response.data.message : 'Student not found');
      setStudent(null);
    }
  };

  const handleDelete = async () => {
    if (!studentId) {
      setError('Please enter a student ID.');
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/student/${studentId}`);
      setStudent(null);
      setStudentId('');
      setError('');
      alert('Student details deleted successfully.');
    } catch (error) {
      console.error('Error deleting student details:', error);
      setError(error.response ? error.response.data.message : 'Failed to delete student details');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 py-10'>
      <div className='bg-white shadow-lg rounded-lg w-full max-w-md p-6'>
        <h2 className='text-2xl font-bold text-center mb-6'>Student Details</h2>
        
        <div className='flex mb-6'>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className='border-2 border-gray-300 rounded-l-lg p-3 flex-1 focus:outline-none focus:border-emerald-500'
          />
          <button
            onClick={handleSearch}
            className='bg-emerald-500 text-white rounded-r-lg px-4 py-3 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'
          >
            Search
          </button>
        </div>

        {student ? (
          <div className='space-y-4'>
            <p className='text-lg'><strong>Name:</strong> {student.name}</p>
            <p className='text-lg'><strong>Email:</strong> {student.email}</p>
            <p className='text-lg'><strong>Assessment Mark:</strong> {student.assessmentMark || 'N/A'}</p>
            <p className='text-lg'><strong>Attendance Mark:</strong> {student.attendanceMark || 'N/A'}</p>
            <p className='text-lg'><strong>Project Review Mark:</strong> {student.projectReviewMark || 'N/A'}</p>
            <p className='text-lg'><strong>Project Submission Mark:</strong> {student.projectSubmissionMark || 'N/A'}</p>
            <p className='text-lg'><strong>LinkedIn Post Mark:</strong> {student.linkedinPostMark || 'N/A'}</p>
            <button
              onClick={handleDelete}
              className='mt-4 w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              Delete Student
            </button>
          </div>
        ) : (
          error && <p className='text-red-500 text-center mt-4'>{error}</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
