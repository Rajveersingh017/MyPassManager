const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// middleware to protect routes using jwt token.
const validateToken = asyncHandler(async(req, res, next)=>{
    let token;
    let auth = req.headers.authorization || req.headers.Authorization;
    if (auth && auth.startsWith("Bearer")){
        token = auth.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err){
                res.status(401);
                throw new Error("user is not authorized");
            }
            req.user = data.user;
            next();
        });
        if(!token){
            res.status(401)
            throw new Error("user is not authorized");
        }
    }
});

module.exports = validateToken;