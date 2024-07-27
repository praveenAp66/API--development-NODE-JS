const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path as needed
const errorhandler = require('../controller/errorcontroller.js'); // Adjust the path as needed

// Handler for creating a new assignment
const createAssignment = (req, res) => {
    const { batch_id, instructor_id, title, description, due_date } = req.body;

    // Validate required fields
    if (!batch_id || !instructor_id || !title || !due_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // SQL query to insert a new assignment
    const user_query = `
        INSERT INTO Assignments (batch_id, instructor_id, title, description, due_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(user_query, [batch_id, instructor_id, title, description, due_date], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        res.status(201).json({
            message: 'Assignment successfully created',
            assignment_id: result.insertId
        });
    });
};


module.exports = createAssignment;
