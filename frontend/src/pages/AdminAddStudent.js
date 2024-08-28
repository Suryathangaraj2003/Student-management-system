import React, { useState } from 'react';
import axios from 'axios';

const AdminAddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-student', { name, email });
      setMessage('Student added successfully!');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding student:', error.response ? error.response.data : error.message);
      setMessage('Failed to add student.');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 py-10'>
      <div className='bg-white shadow-lg rounded-lg w-80 p-6'>
        <h2 className='text-2xl font-bold text-center mb-4'>Add Student</h2>
        <form className='flex flex-col' onSubmit={handleAddStudent}>
          <label htmlFor="name" className='mb-1 font-medium'>Name</label>
          <input
            type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='rounded border-2 border-gray-300 p-2 mb-4 focus:outline-none focus:border-emerald-500'
            placeholder='Enter student name'
            required
          />
          <label htmlFor="email" className='mb-1 font-medium'>Email</label>
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded border-2 border-gray-300 p-2 mb-6 focus:outline-none focus:border-emerald-500'
            placeholder='Enter student email'
            required
          />
          <button className='bg-emerald-500 text-white rounded py-2 px-4 w-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
            Add Student
          </button>
          {message && <p className='mt-4 text-center'>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminAddStudent;
