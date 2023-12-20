const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');


const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser) 

// validating the token on the current user
router.post("/current", validateToken, currentUser)


module.exports = router;