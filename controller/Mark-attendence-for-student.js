const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path as needed
const errorhandler = require('../controller/errorcontroller.js'); // Adjust the path as needed

// Handler for marking attendance
const markAttendance = (req, res) => {
    const { student_id, lecture_id, status } = req.body;

    // Validate required fields
    if (!student_id || !lecture_id || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate status
    if (!['Present', 'Absent'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    // SQL query to insert attendance record
    const user_query = `
        INSERT INTO Attendance (student_id, lecture_id, status)
        VALUES (?, ?, ?)
    `;

    connection.query(user_query, [student_id, lecture_id, status], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); 
        }

        res.status(201).json({
            message: 'Attendance successfully marked',
            attendance_id: result.insertId
        });
    });
};



module.exports = markAttendance;
