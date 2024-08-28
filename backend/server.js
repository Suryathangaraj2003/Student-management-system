const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB:', error));

// Define the schema for student marks
const studentMarkSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  assessmentMark: { type: Number },
  attendanceMark: { type: Number },
  projectReviewMark: { type: Number },
  projectSubmissionMark: { type: Number },
  linkedinPostMark: { type: Number },
});

const StudentMark = mongoose.model('StudentMark', studentMarkSchema);

// Import models
const Student = require('./models/Students');
const StudentDetails = require('./models/StudentDetails');

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Define the routes for file uploads
const uploadRoutes = [
  { path: '/attendance', field: 'attendanceMark' },
  { path: '/assessment', field: 'assessmentMark' },
  { path: '/project-review', field: 'projectReviewMark' },
  { path: '/project-submission', field: 'projectSubmissionMark' },
  { path: '/linkedin-post', field: 'linkedinPostMark' }
];

uploadRoutes.forEach(({ path, field }) => {
  app.post(`/api/marks/upload${path}`, upload.single('file'), async (req, res) => {
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
        const { StudentId, Name } = row;
        if (StudentId && Name) {
          const updateFields = {
            [field]: row[field] // Use the dynamic field name
          };

          try {
            // Update the student document with the new mark
            await StudentMark.findOneAndUpdate(
              { studentId: String(StudentId) },  // Match the student by ID
              {
                name: Name,
                ...updateFields
              },
              { upsert: true, new: true }  // Upsert to create if it doesn't exist
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
});

// Route to get all students with their marks
app.get('/api/students', async (req, res) => {
  try {
    // Fetch students and their marks
    const students = await StudentDetails.find({}).lean();
    const marks = await StudentMark.find({}).lean();

    // Combine students with their marks
    const studentsWithMarks = students.map(student => {
      const studentMarks = marks.find(mark => mark.studentId === student.studentId);
      return {
        ...student,
        assessmentMark: studentMarks ? studentMarks.assessmentMark : null,
        attendanceMark: studentMarks ? studentMarks.attendanceMark : null,
        projectReviewMark: studentMarks ? studentMarks.projectReviewMark : null,
        projectSubmissionMark: studentMarks ? studentMarks.projectSubmissionMark : null,
        linkedinPostMark: studentMarks ? studentMarks.linkedinPostMark : null,
      };
    });

    res.status(200).json(studentsWithMarks);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// Student login route
app.post('/api/student-login', async (req, res) => {
  const { studentId } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(401).json({ message: 'Invalid student ID. You are not registered as a student.' });
    }
    res.status(200).json({ message: 'Login successful', student });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all students with their details and marks
app.get('/api/student-details', async (req, res) => {
  try {
    const students = await StudentDetails.find({}).lean();
    const marks = await StudentMark.find({}).lean();

    // Add marks to the corresponding student
    const studentsWithMarks = students.map(student => {
      const studentMarks = marks.find(mark => mark.studentId === student.studentId);
      return {
        ...student,
        marks: studentMarks ? {
          assessmentMark: studentMarks.assessmentMark,
          attendanceMark: studentMarks.attendanceMark,
          projectReviewMark: studentMarks.projectReviewMark,
          projectSubmissionMark: studentMarks.projectSubmissionMark,
          linkedinPostMark: studentMarks.linkedinPostMark,
        } : {}
      };
    });

    res.status(200).json(studentsWithMarks);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Failed to fetch student details' });
  }
});

// Add a new student
app.post('/api/students/add', async (req, res) => {
  const { studentId, email, name, password } = req.body;
  try {
    const newStudent = new StudentDetails({ studentId, email, name, password });
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Failed to add student' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
