const User = require("../model/userSchema.js");
const emailValidator = require("email-validator");

const register = async (req, res) => {
    const { name, email, password , confirmPassword } = req.body;

    const  validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success: false ,
            message: "Please provide a valid email"
        })
    }

    if(password !== confirmPassword){
        return status(400).json({
            success: false ,
            message: "Password and confirmPassword dosen't mach!"
        })
    }
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists!",
            });
        }

        const user = await User.create({ name, email, password });

        res.status(200).json({
            success: true,
            msg: "User registered successfully!",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

const logIn = async (req , res) => {
    const { email , password } = req.body;

    try {
        const user = await User.findOne({email}).select('+password');

    if(!password || user.password !== password){
        return res.status(400).json({
            success: false,
            msg: "Invalid credentials!"
        })
    }

// Generating jwt_token :---
    const token = user.jwtToken(); // Yanha par jwt_token generate kiya ja raha hai ! 
    user.password = undefined; // removing password from the "user"


// Yanha par "jwtToken" ko cookie me rakha ja raha hai .
    const cookieOpetion = {
        maxAge: 24*60*60*1000, // maximum age of cookie is 1 day.
        httpOnly : true // It ristrict the access of cookie from the client side.
    }

// response me humlog cookie set kar rahen hai :---

res.cookie( "token" , token , cookieOpetion );
res.status(200).json({
    success: true ,
    msg: "cookie set successfully!" ,
    data: user
})
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}

module.exports = {
    register,
    logIn
}
