
const Project = require('../models/Project');

exports.createProject = async (req, res) => {


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