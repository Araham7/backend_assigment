require("dotenv").config();
const app = require("./app.js");

const PORT = process.env.PORT || 7596;

app.listen(PORT , ()=>{
    console.log(`Server is listening at > http://localhost:${PORT}`);
})