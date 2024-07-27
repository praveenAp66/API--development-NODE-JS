const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js");


const classes = (req, res) => {
    const instructor_id = req.params.id; 
    if (!instructor_id) {
        return res.status(400).json({ message: "Missing required parameter: id" });
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
WHERE l.instructor_id = ?  
ORDER BY l.date;
`;



// -- Query to get upcoming classes for a specific instructor
// SELECT 
//     l.id AS lecture_id,
//     l.topic,
//     l.date,
//     b.name AS batch_name,
//     i.name AS instructor_name
// FROM Lectures l
// JOIN Batches b ON l.batch_id = b.id
// JOIN Instructors i ON l.instructor_id = i.id
// WHERE l.instructor_id = ?  -- Parameter for instructor id
// AND l.date >= CURDATE()  -- Filter for upcoming classes
// ORDER BY l.date;

    connection.query(user_query, [instructor_id], (err, result) => {
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

module.exports = classes;