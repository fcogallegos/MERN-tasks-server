//routes for create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create an user
// endpoint: api/users
router.post('/', 
    userController.createUser
);

module.exports = router;


//model view es quien interactua con la BD
//controller is quien toma los request 