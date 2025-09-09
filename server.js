// Importing required modules. 
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const env = require("dotenv").config();

// Connect to MongoDB
connectDB();  


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  

// API ROUTES
//// Route for password-related operations
app.use("/api/passwords",require("../MyPasswordManager-Backend/routes/passwordRoutes"));
// Route for user-related operations
app.use("/api/users", require("../MyPasswordManager-Backend/routes/userRoutes"));

// Custom error handling middleware
app.use(errorHandler);

// Start the server
app.listen( port, () =>{
    console.log("server is running on port: " + port); 
});                            