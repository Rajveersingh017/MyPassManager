const asyncHandler = require("express-async-handler");
const Password = require("../models/Passwords");
const encrypt = require("bcrypt");
const crypto = require("crypto");
const { encryptPassword, decryptPassword } = require("../utils/encrypt");


//@desc display all passwords made by User
//@route GET /api/passwords
//@access private
const getPasswords = asyncHandler(async(req, res) =>{
    console.log("fetching passowrdds")
    try {
        console.log("in the try block");
        const pass = await Password.find({user_id: req.user.id});
        res.status(200).json(pass);
    } catch (error) {
        console.log(error);
    }

});

//@desc create new entry in the password database
//@route POST /api/passwords
//@access private
const postPasswords = asyncHandler(async(req, res) => {
    const {username, password, websiteName, websiteURL} = req.body;

    if (!username || !password || !websiteName || !websiteURL )
    {
        res.status(400);
        throw new Error("All fields are requried!");
    }
    try {

        const hashedPassword = await encryptPassword(password);
        
        const newPassword = await Password.create({
            user_id:req.user.id,
            username,
            password: JSON.stringify(hashedPassword),
            websiteName, 
            websiteURL,
        });
    res.status(201).json({messsage: "newPassword"});
    } catch (error) {
        console.log(error);
    }
    
});

//@desc Update a selected password
//@route PUT /api/passwords/Id
//@access private
const updatePassword = asyncHandler(async(req, res) => { 
    const {newUsername, newPassword, newWebsiteName, newWebsiteURL} = req.body
    try {
        const password = await Password.findById(req.params.id);
        if (!password) {
            res.status(404);
            throw new Error("Password was not found!");
        }
        console.log(password.user_id);
        console.log(req.user.id);
        if (password.user_id.toString() === req.user.id){
            const updatePassword = await Password.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
            )
            res.status(200).json(updatePassword);
        }
        else{
            res.status(401)
            throw new Error("unauthorized")
        }
    } catch (error) {
        console.log(error);
    }
});

//@desc delete a password
//@route DELETE /api/passwords/id
//@access private
const deletePassword = asyncHandler(async(req, res) => { 
     try {
        const password = await Password.findById(req.params.id);
        if (!password) {
            res.status(404);
            throw new Error("Password was not found!");
        }
        if(password.user_id.toString() === req.user.id){
            await Password.findByIdAndDelete(password.id); 
            res.status(200).json({messsage: "deleted successfully! ", password});
        }
        else{
            res.status(401)
            throw new Error("Unauthorized! unable to delete!")
        }
    } catch (error) {
        console.log(error);
    }
});

//@desc Retrive single password by id.
//@route GET /api/passwords/id
//@access private
const getPassword = asyncHandler(async(req, res) => { 
    try {
        const password = await Password.findById(req.params.id);
        if (!password) {
            res.status(404);
            throw new Error("Password was not found!");
        }
            
        let encryptPassword;
        if (typeof password.password === "string"){
            encryptPassword = JSON.parse(password.password)
        }
        else {
            encryptPassword = password.password;
        }
        
        password.password = await decryptPassword(encryptPassword);

        res.status(200).json(password);
    } catch (error) {
        console.log(error);   
    } 
});


//exports 
module.exports = {
    getPasswords,
    postPasswords,
    updatePassword,
    deletePassword,
    getPassword
}