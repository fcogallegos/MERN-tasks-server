const express = require('express');
const conectDB = require('./config/db');

//create the server
const app = express();

//CONECT TO DATABASE
conectDB();

//enable express.json
app.use(express.json({ extended: true }));

//port of the server
const PORT = process.env.PORT || 14000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));


//define the main page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//run the server
app.listen(PORT, () => {
    console.log(`The server is running in the port ${PORT}`);
});


