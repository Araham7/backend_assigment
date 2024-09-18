const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectToDb = async () => {
    mongoose.connect(DB_URL)
    .then((conn)=>{
        console.log(`Connected to Db > ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(`Error occurred during connection > ${error.message}`);
        process.exit(1);
    })
}

module.exports = connectToDb;