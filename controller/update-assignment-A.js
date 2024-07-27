const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path as needed
const errorhandler = require('../controller/errorcontroller.js'); // Adjust the path as needed

// Handler for updating an assignment
const updateAssignment = (req, res) => {
    const assignmentId = req.params.id;
    const { batch_id, instructor_id, title, description, due_date } = req.body;

    // Validate required fields
    if (!batch_id || !instructor_id || !title || !description || !due_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Static SQL query
    const user_query = `
        UPDATE Assignments
        SET batch_id = ?, instructor_id = ?, title = ?, description = ?, due_date = ?
        WHERE id = ?
    `;

    connection.query(user_query, [batch_id, instructor_id, title, description, due_date, assignmentId], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json({
            message: 'Assignment successfully updated',
            affectedRows: result.affectedRows
        });
    });
};


module.exports = updateAssignment;
