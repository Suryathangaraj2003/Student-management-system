const express = require('express');
const router = express.Router();
const StudentMark = require('../models/Students');  // Make sure this path is correct

// Route to get student details by studentId
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentMark.findOne({ studentId: id });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Failed to fetch student' });
  }
});

module.exports = router;
