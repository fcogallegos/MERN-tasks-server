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

router.get('/', 
    auth,
    projectController.createProject
);

module.exports = router;