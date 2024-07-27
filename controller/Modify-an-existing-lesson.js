const express = require("express");
const router = express.Router();
const connection = require("../mysql/mysql.js"); /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js");

const lessons = function (req, res) {
    const lessonId = req.params.id;
    const { batch_id, instructor_id, topic, date } = req.body;
    if (!batch_id || !instructor_id || !topic || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }


  const user_query = `
         UPDATE Lectures
        SET batch_id = ?, instructor_id = ?, topic = ?, date = ?
        WHERE id = ?;`;
  connection.query(user_query,  [batch_id, instructor_id, topic, date, lessonId], (err, result) => {
    if (err) {
        return errorhandler(err, req, res, 500); // Use 500 for server errors
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Lesson not found' });
    }

    res.status(200).json({
        message: 'Lesson successfully updated',
        lesson_id: lessonId
    });
  });
};
module.exports = lessons;
