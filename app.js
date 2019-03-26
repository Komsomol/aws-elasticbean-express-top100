const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');

// test end point
app.get('/test', (req, res) => {
    res.send({
        status:'Server is up'
    })
});

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// listen server
app.listen(port, () =>{
    console.log(`Server running on ${port}`);
})

