// Importing required modules.
const express = require('express');
const router = express.Router();

// Import middleware to validate JWT tokens
const validateToken = require('../middleware/userAuth');

// Import controller functions for password operations
const {
    getPasswords,
    postPasswords,
    updatePassword,
    deletePassword,
    getPassword
} = require("../controllers/passwordController");

// Protecting all routes with custom authentication middleware
router.use(validateToken)

// Routes for general password operations
router.route("/")
    .get(getPasswords)
    .post(postPasswords);

// Routes for operations on a specific password by ID
router.route("/:id")
    .put(updatePassword)
    .delete(deletePassword)
    .get(getPassword);

module.exports = router;