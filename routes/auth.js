//routes for auth users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//create an user
// endpoint: api/auth
router.post('/',
    [
        check('email', 'Add an valid email ').isEmail(),
        check('password', 'The password must be minimum of 6 caracters').isLength({ min: 6 })
    ],
    authController.authenticateUser
);

module.exports = router;
