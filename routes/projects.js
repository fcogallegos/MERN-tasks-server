const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');



//create projects
// endpoint: api/projects
router.post('/', 
    projectController.createProject
);


module.exports = router;