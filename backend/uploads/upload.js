// routes/upload.js
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const StudentMark = require('../models/StudentMark');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/upload/student-marks', upload.single('file'), async (req, res) => {
  try {
    // Read the uploaded file
    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // Iterate over the data and save it to MongoDB
    for (const record of xlData) {
      const { studentId, name, mark } = record;
      await StudentMark.findOneAndUpdate(
        { studentId },
        { name, mark },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: 'Student marks uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading student marks:', error);
    res.status(500).json({ message: 'Failed to upload student marks.' });
  }
});

module.exports = router;
