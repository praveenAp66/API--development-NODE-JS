const express = require("express");
const router = express.Router()
const connection = require("../mysql/mysql.js") /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js")




const lessons = function (req, res) {
    const { batch_id, instructor_id, topic, date } = req.body;
    // Validate required fields
    if (!batch_id || !instructor_id || !topic || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const user_query = "INSERT INTO Lectures (batch_id, instructor_id, topic, date) VALUES (?, ?, ?, ?)"
    connection.query(user_query, [batch_id, instructor_id, topic, date], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 400);

        }
        else {

            res.set(
                {
                    "Content-Type": "application/json"
                }
            )
            res.status(201).json({
                message: 'Lesson successfully created',
                lesson_id: result.insertId
            });
        }

    })

}




module.exports = lessons