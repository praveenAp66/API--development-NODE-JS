const express=require ("express") 
const app=express() 

const dotenv=require("dotenv").config()
port=process.env.PORT

const routes = require('./routes/routes')
app.use(express.json())

app.use("/api",routes)
app.listen(port,(err)=>{
    if(err)
        {
            console.log("there is error in starting the server")
        }
        else{
            console.log("server is running on port",port)
        }
})