const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authenticateUser = async (req, res) => {

    //review if there is errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extract the email and password
    const { email, password } = req.body;

    try {
        //check that a registered user
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'The user is not exist' });
        }

        //check the password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword) {
            return res.status(400).json({ msg: 'Incorrect password' });
        }


        //if all is correct
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
    }

    

}