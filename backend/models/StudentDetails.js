const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // Added studentId
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);

module.exports = StudentDetails;
