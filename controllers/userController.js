const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {


    //review if there are errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

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

        //create and sign JWT
        const payload = { 
            user: {
                id: user.id
            }
         };

         //sign the JWT
         jwt.sign(payload, process.env.SECRET, {
             expiresIn: 3600 //1 hour
         }, (error, token) => {
            if(error) throw error;

            //message of confirmation
            res.json({ token });
         });

        
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }

}

