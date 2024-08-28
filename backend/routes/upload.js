const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const StudentMark = require('../models/StudentMark'); // Adjust path if necessary

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to process and save data
const processAndSaveData = async (filePath, markType) => {
  try {
    // Read the uploaded Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON format
    const data = XLSX.utils.sheet_to_json(sheet);

    // Process and save each row in the database
    for (const row of data) {
      const { studentId, name, mark } = row;

      // Prepare data object based on markType
      const updateData = {};
      updateData[markType] = mark; // Dynamic field update

      // Update or insert the student mark
      await StudentMark.findOneAndUpdate(
        { studentId },
        { name, ...updateData },
        { upsert: true, new: true }
      );
    }

    // Delete the file after processing
    fs.unlinkSync(filePath);
    
    return { success: true, message: `${markType} marks uploaded and processed successfully`, data };
  } catch (error) {
    console.error('Error processing the file:', error);
    throw new Error('Failed to process the uploaded file');
  }
};

// Route to handle attendance marks upload
router.post('/attendance', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await processAndSaveData(filePath, 'attendanceMark');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing attendance marks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to handle assessment marks upload
router.post('/assessment', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await processAndSaveData(filePath, 'assessmentMark');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing assessment marks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to handle project review marks upload
router.post('/project-review', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await processAndSaveData(filePath, 'projectReviewMark');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing project review marks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to handle project submission marks upload
router.post('/project-submission', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await processAndSaveData(filePath, 'projectSubmissionMark');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing project submission marks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to handle LinkedIn post marks upload
router.post('/linkedin-post', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await processAndSaveData(filePath, 'linkedinPostMark');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing LinkedIn post marks:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
