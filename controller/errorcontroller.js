const  express = require("express");
const errorhandler = function(err,req,res,statuscode){
     res.statuscode=statuscode
     res.set({
        "Content-type":"application/json"
     })
     if(res.statuscode===500)
     res.send({
        "messege":"error in handling request"
     })
    else if(res.statuscode === 400)
    {
    
        // res.send({"messege":"bad api request"})
        // res.send(err)  it will display the error messege what we pass to this
        res.send(err)
    }
    else{
        res.send({"messege":"internal server error"})
    }
       
  
} 
module.exports=errorhandler