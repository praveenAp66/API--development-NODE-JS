const express = require("express");
const router = express.Router()
const connection = require("../mysql/mysql.js") /*./---> means in current directort,../-->one step back and in thatdirectory*/
const errorhandler = require("../controller/errorcontroller.js")




const register=function(req, res) {
    const first_name = req.body.name;
    const user_query = "SELECT * from batches where name=?"
    connection.query(user_query, [first_name], (err, result) => {
        if (err) {
            return errorhandler(err, req, res, 400);

        }
        if (result.length > 0) {

            errorhandler("user already exists plz login ", req, res, 400)
        }
        else {

            const reg_query = "INSERT INTO batches SET name=?"
            const user_details = req.body;
            connection.query(reg_query, [user_details.name],
                (err1, result1) => {
                    if (err1) {
                        return errorhandler(err1, req, res, 400)
                    }
                    else {
                        res.set(
                            {
                                "Content-Type": "application/json"
                            }
                        )
                        res.statusCode = 201
                        res.send(
                            {
                                "messege": "user is created login and enjoy"
                            }
                        )
                    }

                })

        }


    })
}
module.exports=register