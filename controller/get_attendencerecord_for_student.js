const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path as needed
const errorhandler = require('../controller/errorcontroller.js'); // Adjust the path as needed

// Handler for getting attendance record for a specific student
const getAttendanceByStudent = (req, res) => {
    const studentId = req.params.id; 

    if (!studentId) {
        return res.status(400).json({ message: 'Missing required parameter: id' });
    }

    const user_query = `
        SELECT a.id AS attendance_id, 
               a.lecture_id, 
               a.status, 
               l.topic AS lecture_topic, 
               l.date AS lecture_date
        FROM Attendance a
        JOIN Lectures l ON a.lecture_id = l.id
        WHERE a.student_id = ?
    `;

    connection.query(user_query, [studentId], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this student' });
        }

        res.status(200).json({
            message: 'Successfully retrieved attendance records',
            attendance_records: result
        });
    });
};



module.exports = getAttendanceByStudent;
