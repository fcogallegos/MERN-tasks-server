const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//create projects
// endpoint: api/projects
router.post('/', 
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.createProject
);

//get all projects
router.get('/', 
    auth,
    projectController.getProjects
);

//update project for "id"
router.put('/:id',
    auth, 
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.updateProject
);


module.exports = router;