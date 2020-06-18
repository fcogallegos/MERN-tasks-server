const express = require('express');

//create the server
const app = express();

//port of the server
const PORT = process.env.PORT || 4000;

//define the main page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//run the server
app.listen(PORT, () => {
    console.log(`The server is running in the port ${PORT}`);
});