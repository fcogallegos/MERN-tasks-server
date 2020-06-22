
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    //review if there are errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //create a new project
        const project = new Project(req.body);

        //save the creator for JWT
        project.creator = req.user.id

        //save the project
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

//get all the projects of current User
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}