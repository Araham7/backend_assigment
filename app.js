const express = require("express");
const connectToDb = require("./cnfig/db.js");
const cors = require("cors");
const userRouth = require("./router/authRoutes.js")

connectToDb(); // Initialiging connection to db .

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors()); // enanbling "cross origin request".

// handalling home routh :---
app.get("/" , (req , res)=>{
    res.status(200).json({
        success: true,
        message: "You are on the home page!"
    })
});

// handalling 
app.use("/api/auth/" , userRouth);


module.exports = app;