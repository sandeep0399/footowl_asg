const express = require("express") 
const dotenv = require('dotenv');
const db = require("./db");
const userRoutes= require("./routes/userRoutes");
const borrowRequestsRoutes = require("./routes/borrowRequestsRoutes")
const loginRoutes = require("./routes/loginRoutes")

const cookies=require("cookie-parser")


dotenv.config();



const app= express()
app.use(cookies())

//middleware
app.use(express.json())



//routes

app.use("/login",loginRoutes )

app.use("/api/user", userRoutes) 

app.use('/api/borrow-requests',borrowRequestsRoutes)



const PORT =process.env.PORT

//conditional listen 
db.query("SELECT 1").then(()=>{
    
    console.log("my sql DB is connected")

    //listen
app.listen(PORT,()=>{
    console.log("server is running")
})
    
}).catch((err)=>{
    console.log(err)
})




