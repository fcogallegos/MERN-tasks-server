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


// get the tasks for project
exports.getTasks = async (req, res) => {
    
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

        // get the tasks for projects
        const tasks = await Task.find({ project });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'There was a error' });
    }
}

// Update a Task
exports.updateTask = async (req, res) => {
    try {
        //extract the project and check if exist
        const { project, name, status } = req.body;
    
        //check if the task exist or no
        let task = await Task.findById(req.params.id);
        
        if(!task) {
            return res.status(404).json({ msg: 'Not exist that task' });
        }
        
        //extract the project
        const existProject = await Project.findById(project);
       
        //check if the current project belongs to the user authenticated
        if( existProject.creator.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
       

        // create an object with the new information
        const newTask = {};

        if(name) {
            newTask.name = name;
        }

        if(status) {
            newTask.status = status;
        }

        // save the task
        task = await Task.findOneAndUpdate({ _id : req.params.id }, newTask, { new : true });

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'There was a error' });
    }
}