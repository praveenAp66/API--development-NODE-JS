const express = require("express");
const router = express.Router()
const connection = require("../mysql/mysql.js") /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js")




const assignments = function (req, res) {
    const { batch_id, instructor_id, title, description, due_date } = req.body;
    // Validate required fields
    if (!batch_id || !instructor_id || !title || !due_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }



    const user_query = "INSERT INTO Assignments (batch_id, instructor_id, title, description, due_date) VALUES (?, ?, ?, ?, ?)"
    connection.query(user_query, [batch_id, instructor_id, title, description, due_date], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        }

        else {
            res.set(
                {
                    "Content-Type": "application/json"
                }
            )
            res.status(201).json({
                message: 'Assignment successfully created',
                assignment_id: result.insertId
            });


        }




    })
}
module.exports = assignments