const express = require('express');
const router = express.Router();
const connection = require('../mysql/mysql.js'); // Adjust the path as needed
const errorhandler = require('../controller/errorcontroller.js'); // Adjust the path as needed

const getAssignmentDetails = (req, res) => {
    const assignmentId = req.params.id;

    // SQL query to get details of a specific assignment
    const user_query = `
        SELECT 
            a.id AS assignment_id,
            a.title,
            a.description,
            a.due_date,
            b.name AS batch_name,
            i.name AS instructor_name
        FROM Assignments a
        JOIN Batches b ON a.batch_id = b.id
        JOIN Instructors i ON a.instructor_id = i.id
        WHERE a.id = ?
    `;

    connection.query(user_query, [assignmentId], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json({
            message: 'Successfully retrieved assignment details',
            assignment: result[0]
        });
    });
};



module.exports = getAssignmentDetails;
