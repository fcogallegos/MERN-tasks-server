const User = require('../models/User');

exports.createUser = async (req, res) => {

    try {
        let user;

        //create the new user
        user = new User(req.body);

        //save user
        await user.save();

        //message of confirmation
        res.send('User created succesful');
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }

}