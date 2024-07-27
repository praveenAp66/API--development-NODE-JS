const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); // Adjust the path as needed
const errorhandler = require("../controller/errorcontroller.js"); // Adjust the path as needed

const getLectureDetails = function (req, res) {
    const lectureId = req.params.id;

    if (!lectureId) {
        return res.status(400).json({ message: 'Missing required parameter: id' });
    }

    const user_query = `
        SELECT 
            l.id AS lecture_id,
            l.topic,
            l.date,
            b.name AS batch_name,
            i.name AS instructor_name
        FROM Lectures l
        JOIN Batches b ON l.batch_id = b.id
        JOIN Instructors i ON l.instructor_id = i.id
        WHERE l.id = ?;
    `;

    connection.query(user_query, [lectureId], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        } else {
            if (result.length === 0) {
                return res.status(404).json({ message: 'Lecture not found' });
            }
            res.status(200).json({
                message: 'Successfully retrieved the lecture details',
                lecture_details: result[0]
            });
        }
    });
};



module.exports = getLectureDetails;
