const User = require('../models/User');
const bcryptjs = require('bcryptjs');


exports.createUser = async (req, res) => {

    //extract email and password
    const { email, password } = req.body;

    try {
        //review that the user is unique
        let user = await User.findOne({ email });

        if(user) { 
            return res.status(400).json({ msg: 'The user already exist' });
        }

        //create the new user
        user = new User(req.body);

        //Hashear the password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //save user
        await user.save();

        //message of confirmation
        res.json({ msg: 'User successfully created' });
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }

}

