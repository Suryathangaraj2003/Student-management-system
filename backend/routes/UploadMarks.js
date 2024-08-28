const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle mark uploads
router.post('/upload/student-marks', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    // Read the uploaded Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON format
    const data = XLSX.utils.sheet_to_json(sheet);

    // Process and save each row in the database
    for (const row of data) {
      const { StudentId, Name, AssessmentMark, AttendanceMark, ProjectReviewMark, ProjectSubmissionMark, LinkedInPostMark } = row;

      if (StudentId && Name) {
        try {
          // Update or create the student mark entry
          await StudentMark.findOneAndUpdate(
            { studentId: String(StudentId) },
            {
              name: Name,
              assessmentMark: AssessmentMark,
              attendanceMark: AttendanceMark,
              projectReviewMark: ProjectReviewMark,
              projectSubmissionMark: ProjectSubmissionMark,
              linkedinPostMark: LinkedInPostMark,
            },
            { upsert: true, new: true }
          );
        } catch (error) {
          console.error('Error updating marks:', error);
        }
      } else {
        console.warn('Missing data in row:', row);
      }
    }

    // Respond with a success message
    res.status(200).json({ message: 'Marks uploaded and processed successfully', data });

    // Delete the file after processing
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error processing the file:', error);
    res.status(500).json({ message: 'Failed to process the uploaded file' });
  }
});

module.exports = router;
