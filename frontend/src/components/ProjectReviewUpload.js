import React, { useState } from 'react';
import axios from 'axios';

const ProjectReviewUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload/project-review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Project review marks uploaded successfully!');
    } catch (error) {
      console.error('Error uploading project review marks:', error.response ? error.response.data : error.message);
      setMessage('Failed to upload project review marks.');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 py-10'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-96'>
        <h2 className='text-2xl font-bold text-center mb-6'>Upload Project Review Marks</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-purple-500 file:text-white
                     hover:file:bg-purple-700
                     mb-4'
        />
        <button
          onClick={handleUpload}
          className='bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 w-full mb-4'
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

export default ProjectReviewUpload;
