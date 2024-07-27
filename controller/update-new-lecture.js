const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); // Adjust the path as needed
const errorhandler = require("../controller/errorcontroller.js"); // Adjust the path as needed

const updateLecture = function (req, res) {
    const lectureId = req.params.id;
    const { batch_id, instructor_id, topic, date } = req.body;

    // Validate required fields
    if (!batch_id || !instructor_id || !topic || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const user_query = "UPDATE Lectures SET batch_id = ?, instructor_id = ?, topic = ?, date = ? WHERE id = ?";
    
    connection.query(user_query, [batch_id, instructor_id, topic, date, lectureId], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        res.set("Content-Type", "application/json");
        res.status(200).json({
            message: 'Lecture successfully updated',
            affectedRows: result.affectedRows
        });
    });
};



module.exports = updateLecture;
