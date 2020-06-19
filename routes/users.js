//routes for create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');


//create an user
// endpoint: api/users
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Add an valid email ').isEmail(),
        check('password', 'The password must be minimum of 6 caracters').isLength({ min: 6 })
    ],
    userController.createUser
);

module.exports = router;


//model view es quien interactua con la BD
//controller is quien toma los request 