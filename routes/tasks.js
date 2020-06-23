const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// create a task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The Name is required').not().isEmpty(),
        check('project', 'The Project is required').not().isEmpty()
    ],
    taskController.createTask
);

// get the tasks for project
router.get('/',
    auth,
    taskController.getTasks
);


// update task
router.put('/:id', 
    auth,
    taskController.updateTask
);

module.exports = router;