import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student details from the server
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/students');
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:5000/api/students');
      setStudents([]);
      alert('All student data has been deleted.');
    } catch (error) {
      console.error('Error deleting student data:', error);
      alert('Failed to delete student data.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Students</h2>
      <button
        onClick={handleDeleteAll}
        className="mb-4 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete All Data
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Assessment Mark</th>
              <th className="py-3 px-4 border-b">Attendance Mark</th>
              <th className="py-3 px-4 border-b">Project Review Mark</th>
              <th className="py-3 px-4 border-b">Project Submission Mark</th>
              <th className="py-3 px-4 border-b">LinkedIn Post Mark</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {students.map((student) => (
              <tr key={student.studentId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.studentId}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.assessmentMark !== null ? student.assessmentMark : 'N/A'}</td>
                <td className="py-3 px-4">{student.attendanceMark !== null ? student.attendanceMark : 'N/A'}</td>
                <td className="py-3 px-4">{student.projectReviewMark !== null ? student.projectReviewMark : 'N/A'}</td>
                <td className="py-3 px-4">{student.projectSubmissionMark !== null ? student.projectSubmissionMark : 'N/A'}</td>
                <td className="py-3 px-4">{student.linkedinPostMark !== null ? student.linkedinPostMark : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
