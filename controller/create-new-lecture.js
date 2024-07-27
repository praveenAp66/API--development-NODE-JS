const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); // Adjust the path as needed
const errorhandler = require("../controller/errorcontroller.js"); // Adjust the path as needed

const createLecture = function (req, res) {
    const { batch_id, instructor_id, topic, date } = req.body;

    // Validate required fields
    if (!batch_id || !instructor_id || !topic || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const user_query = "INSERT INTO Lectures (batch_id, instructor_id, topic, date) VALUES (?, ?, ?, ?)";
    
    connection.query(user_query, [batch_id, instructor_id, topic, date], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        res.set("Content-Type", "application/json");
        res.status(201).json({
            message: 'Lecture successfully created',
            lecture_id: result.insertId
        });
    });
};

// Define the route and export the router


module.exports = createLecture;
