//routes for auth users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Log In
// endpoint: api/auth
router.post('/',
    authController.authenticateUser
);


// get the authenticated User
router.get('/', 
    auth,
    authController.userAuthenticated
);

module.exports = router;
