const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Made to test if api was working.
//@route GET /api/users/
//@access public
const testAPI = (req,res)=>{
    res.status(200).json({message: "User api is up and running!"});
};

//@desc register a new user in db
//@route POST /api/users/register
//@access public
const newUser = asyncHandler(async(req, res) =>{
    try {
        const {username, email, password} = req.body;
        if(!username || !password ||!email){
            res.status(400);
            throw new Error("all fields are required.");
        }
        const checkUsernameAvailblity = await User.findOne({username});
        const checkEmailAvailblity = await User.findOne({email});
        if(checkUsernameAvailblity){
            res.status(400)
            throw new Error("username already exists");
        }
        if(checkEmailAvailblity){
            res.status(400)
            throw new Error("email already exists");
        }

        const hashedPassword = await encrypt.hash(password, 10);
        
        const user = await User.create({username, email, password: hashedPassword});
        if (user){
            res.status(201).json({_id: user.id, email: user.email, username: user.username});
        }
        else{
            res.status(400)
            throw new Error("User data is not valid");
        }
    } catch (error) {
        console.log(error)
    }
});

//@desc Log in user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) =>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400);
            throw new Error("all fields are required.");
        }
        const user = await User.findOne({username});
        if(user && await encrypt.compare(password,user.password)){
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    id: user.id,
                    email: user.email,
                },
            },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn:"10m"
                });
            res.status(200).json({accessToken});
        }else{
            res.status(401)
            throw new Error("username/password is invalid");
        }
    } catch (error) {
        console.log(error)
    }
});


//@desc Logged in user details 
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) =>{
    res.status(200).json(req.user);
});

module.exports = {
    newUser,
    loginUser,
    currentUser,
    testAPI
};