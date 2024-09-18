const express = require("express");
const { register , logIn } = require("../controller/userControllers.js");
const { validateRegister , validateLogin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register" , validateRegister , register);
router.post("/login" , validateLogin , logIn);

module.exports = router;