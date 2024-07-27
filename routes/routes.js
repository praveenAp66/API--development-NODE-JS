const express = require("express");
const router = express.Router()
const connection = require("../mysql/mysql.js") /*./---> means in current directort,../-->one step back and in thatdirectory*/
//students
const register=require("../controller/Register.js")
const studentinfo=require("../controller/studentinfo.js")
const allthelecutresforbatch=require("../controller/allthelecture-studentbatch.js")
const alltheassignmentsforstudent=require("../controller/alltheassignment-dor-student.js")

//instructor
const classesforinstructor = require("../controller/list-of-classtaken-upcoming.js")
const lessons=require("../controller/cretea-new-lesson.js")
const modifylesson=require("../controller/Modify-an-existing-lesson.js")
const createassignment=require("../controller/create-new-assignment.js")
const modifyexistingassignment=require("../controller/modify-existing-assignments.js")

//lectures
const getspecificlecture=require("../controller/getdetails-specific-lecture.js")
const createlectutre=require("../controller/create-new-lecture")
const updatelecture=require("../controller/update-new-lecture.js");
const assignments = require("../controller/alltheassignment-dor-student.js");

// assignments
const getspecoficdetailsof_assignment=require("../controller/getdetailsof-specific-assignment.js")
const cretenewassignment=require("../controller/ctreate-new-assignment-A.js")
const updateassignment=require("../controller/update-assignment-A")


//Attencdence
const markattendence=require("../controller/Mark-attendence-for-student")
const get_attendencerecord_for_student=require("../controller/get_attendencerecord_for_student.js")

// Example route
// router.get('/example', (req, res) => {
//     res.send('Example route');
// });

//students
router.post("/student/register", register)
router.get("/students/dashboard",studentinfo)
router.get("/students/lectures",allthelecutresforbatch)
router.get("/students/assignments",alltheassignmentsforstudent)

//instructor
router.get("/instructors/:id/classes",classesforinstructor)
router.post("/instructors/lessons",lessons)
router.put("/instructors/lessons/:id",modifylesson)
router.post("/instructors/assignments",createassignment)
router.put("/instructors/assignments/:id",modifyexistingassignment)


//lectures
router.get("/lectures/:id",getspecificlecture)
router.post("/lectures",createlectutre)
router.put("/lectures/:id",updatelecture)


//assignments
router.get("/assignments/:id",getspecoficdetailsof_assignment)
router.post("/assignments",cretenewassignment)
router.put("/assignments/:id",updateassignment)

//Attendence
router.post("/attendence",markattendence)
router.get("/attendence/student/:id",get_attendencerecord_for_student)







module.exports = router;
