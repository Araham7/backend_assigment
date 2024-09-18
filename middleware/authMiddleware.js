const validateRegister = (req , res , next)=>{
    const { name , email , password , confirmPassword} = req.body ;
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false ,
            message: "Every fields are required!"
        })
    }
    next();
}

const validateLogin = (req , res , next)=>{
    const { email , password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false , 
            message: "Email and Passwors both are required!"
        })
    }
    next();
}

module.exports = {
    validateRegister ,
    validateLogin
}