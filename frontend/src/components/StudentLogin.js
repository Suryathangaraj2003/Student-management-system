import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../components/loginimg.png';

const StudentLogin = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded student data
  const students = [
    { name: 'Surya', email: 'surya@gmail.com' },
    // Add more students if needed
  ];

  const handleTabClick = (type) => {
    setIsStudent(type === 'student');
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();

    // Check if the student exists in the hardcoded data
    const student = students.find(student => student.name === name && student.email === email);
    if (student) {
      navigate('/student-details', { state: { student } });
    } else {
      setError('Invalid credentials. You are not registered as a student.');
    }
  };

  const handleAdminSubmit = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div>
      <h1 className='text-center text-4xl font-bold text-emerald-600 lg:pt-12 lg:text-6xl bg-gray-100'>
        Zideo Development
      </h1>
      <div className='flex flex-col lg:flex-row items-center min-h-screen bg-gray-100 py-10 px-4'>
        {/* Image and Login Form Containers */}
        <div className='flex-1 flex flex-col lg:flex-row items-center lg:justify-between'>
          {/* Image Container */}
          <div className='lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0'>
            <img src={img} alt="Login illustration" className="w-full h-auto max-w-md object-contain" />
          </div>

          {/* Login Form Container */}
          <div className='lg:w-1/2 flex flex-col items-center'>
            <div className='bg-white shadow-lg rounded-lg w-full max-w-md p-8'>
              <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
              <div className='flex mb-6'>
                <button
                  onClick={() => handleTabClick('student')}
                  className={`w-1/2 py-2 rounded-l-lg border-2 border-emerald-500 ${isStudent ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleTabClick('admin')}
                  className={`w-1/2 py-2 rounded-r-lg border-2 border-emerald-500 ${!isStudent ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Admin Login
                </button>
              </div>

              {isStudent ? (
                <form className='flex flex-col' onSubmit={handleStudentSubmit}>
                  <label htmlFor="name" className='mb-2 font-medium text-gray-700'>Name</label>
                  <input
                    type="text"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='rounded border-2 border-gray-300 p-3 mb-4 focus:outline-none focus:border-emerald-500'
                    placeholder='Enter your name'
                    required
                  />
                  <label htmlFor="email" className='mb-2 font-medium text-gray-700'>Email</label>
                  <input
                    type="text"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded border-2 border-gray-300 p-3 mb-6 focus:outline-none focus:border-emerald-500'
                    placeholder='Enter your email'
                    required
                  />
                  <button type="submit" className='bg-emerald-500 text-white rounded py-2 px-4 w-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
                    Login
                  </button>
                  {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
                </form>
              ) : (
                <div className='flex flex-col'>
                  <label htmlFor="username" className='mb-2 font-medium text-gray-700'>Username</label>
                  <input
                    type="text"
                    name='username'
                    className='rounded border-2 border-gray-300 p-3 mb-4 focus:outline-none focus:border-emerald-500'
                    placeholder='Enter your username'
                  />
                  <label htmlFor="password" className='mb-2 font-medium text-gray-700'>Password</label>
                  <input
                    type="password"
                    name='password'
                    className='rounded border-2 border-gray-300 p-3 mb-6 focus:outline-none focus:border-emerald-500'
                    placeholder='Enter your password'
                  />
                  <button
                    onClick={handleAdminSubmit}
                    className='bg-emerald-500 text-white rounded py-2 px-4 w-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
