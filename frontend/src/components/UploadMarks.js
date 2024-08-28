import React, { useState } from 'react';
import axios from 'axios';

const UploadMarks = () => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:5000/api/upload/student-marks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage(res.data.message);
    } catch (error) {
      console.error('Error uploading marks:', error);
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg w-80 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Marks</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">Select Excel File</label>
            <input
              type="file"
              id="fileInput"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white rounded-md px-4 py-2 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Marks'}
            </button>
          </div>
        </form>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UploadMarks;
