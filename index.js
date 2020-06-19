const express = require('express');
const conectDB = require('./config/db');

//create the server
const app = express();

//CONECT TO DATABASE
conectDB();

//enable express.json
app.use(express.json({ extended: true }));

//port of the server
const PORT = process.env.PORT || 2000;

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