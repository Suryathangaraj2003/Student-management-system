import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [studentId, setStudentId] = useState(''); // Added studentId
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/students/add', {
        studentId, // Send studentId
        email,
        name,
        password,
      });
      setMessage(response.data.message);
      setStudentId(''); // Clear studentId
      setEmail('');
      setName('');
      setPassword('');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Failed to add student');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
            Add Student
          </button>
        </form>
        {message && (
          <p className={`text-center text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
