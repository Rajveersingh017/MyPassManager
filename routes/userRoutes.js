const express = require("express");
const router = express.Router();
const {
    newUser,
    loginUser,
    currentUser,
    testAPI
} = require("../controllers/userController");
const validateToken = require("../middleware/userAuth");

router.get("/", testAPI);
router.post("/register", newUser);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;