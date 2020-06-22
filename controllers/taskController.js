const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');


// create a new task
exports.createTask = async (req, res) => {

    //review if there are errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    
    
    try {

        //extract the project and check if exist
        const { project } = req.body;
    
        
        const existProject = await Project.findById(project);
        if(!existProject) {
            return res.status(404).send({ msg: 'Project not found' });
        }

        //check if the current project belongs to the user authenticated
        if( existProject.creator.toString() !== req.user.id ) {
            return res.status(401).send({ msg: 'Not authorized' });
        }

        //create the task
        const task = Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'There was a error' });
    }


}