import React, { useState } from 'react';
import axios from 'axios';

const AssessmentUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload/attendance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Assessment marks uploaded successfully!');
    } catch (error) {
      console.error('Error uploading assessment marks:', error.response ? error.response.data : error.message);
      setMessage('Failed to upload assessment marks.');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 py-10'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-96'>
        <h2 className='text-2xl font-bold text-center mb-6'>Upload Assessment Marks</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-500 file:text-white
                     hover:file:bg-blue-700
                     mb-4'
        />
        <button
          onClick={handleUpload}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mb-4'
        >
          Upload
        </button>
        {message && (
          <p className={`text-center text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssessmentUpload;
