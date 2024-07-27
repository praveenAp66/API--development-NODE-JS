const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js");


const assignments = (req, res) => {
    const student_id = req.query.id; 
    if (!student_id) {
        return res.status(400).json({ message: "Missing required parameter: id" });
    }

    const user_query = `
     SELECT title 
    FROM Assignments 
    WHERE batch_id = (
    SELECT batch_id 
    FROM Students 
    WHERE id = 4);`
    connection.query(user_query, [student_id], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 500); // Use 500 for server errors
        } else {
            res.status(200).send({
                message: "Successfully retrieved the data based on id",
                user_details: result
            });
        }
    });
};

module.exports = assignments;