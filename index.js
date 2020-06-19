const express = require('express');
const conectDB = require('./config/db');

//create the server
const app = express();

//CONECT TO DATABASE
conectDB();

//port of the server
const PORT = process.env.PORT || 5000;

//import routes
app.use('/api/users', require('./routes/users'));

//define the main page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//run the server
app.listen(PORT, () => {
    console.log(`The server is running in the port ${PORT}`);
});