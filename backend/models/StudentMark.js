const mongoose = require('mongoose');

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

module.exports = StudentMark;
