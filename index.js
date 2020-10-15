const express = require('express');


const getUSStates = require('./getUSSates');
const app = express();


//any static files get serverd
app.use(express.static('client'));

app.get('/api/state', async (req, res) => {
    const states = await getUSStates();

    res.json(states);
});


const port = process.env.PORT || 4242;  

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}!`);
});